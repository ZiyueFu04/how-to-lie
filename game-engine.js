// ============================================
// 《巧言令色》游戏引擎 v3.0
// ============================================

const Game = {
    // 游戏状态
    stats: {
        stability: 100,
        trust: 50,
        deception: 0,
        pressure: 0
    },

    // 叙事稳定性状态
    stabilityState: 'stable',

    // 当前场景
    currentScene: null,
    dialogueIndex: 0,
    isTyping: false,

    // 选择历史
    choiceHistory: [],
    flags: {}, // 记录路径标记
    pathType: null, // 'honest' | 'deception' | 'gray' | 'lost'

    // DOM元素
    elements: {},

    // 打字机配置
    typingSpeed: 25,

    // 初始化
    init() {
        this.cacheElements();
        this.showIntro();
        this.elements.startBtn.addEventListener('click', () => this.startGame());
    },

    // 缓存DOM元素
    cacheElements() {
        this.elements = {
            introScreen: document.getElementById('intro-screen'),
            introText: document.getElementById('intro-text'),
            startBtn: document.getElementById('start-btn'),
            gameScreen: document.getElementById('game-screen'),
            locationTag: document.getElementById('location-tag'),
            sceneTag: document.getElementById('scene-tag'),
            narrativeTitle: document.getElementById('narrative-title'),
            narrativeText: document.getElementById('narrative-text'),
            dialogueArea: document.getElementById('dialogue-area'),
            optionsArea: document.getElementById('options-area'),
            optionsContainer: document.getElementById('options-container'),
            endingScreen: document.getElementById('ending-screen'),
            endingTitle: document.getElementById('ending-title'),
            endingText: document.getElementById('ending-text'),
            historyModal: document.getElementById('history-modal'),
            historyList: document.getElementById('history-list'),
            // 数值元素
            statStability: document.getElementById('stat-stability'),
            statTrust: document.getElementById('stat-trust'),
            statDeception: document.getElementById('stat-deception'),
            statPressure: document.getElementById('stat-pressure'),
            barStability: document.getElementById('bar-stability'),
            barTrust: document.getElementById('bar-trust'),
            barDeception: document.getElementById('bar-deception'),
            barPressure: document.getElementById('bar-pressure')
        };
    },

    // ========== 开场 ==========

    showIntro() {
        const intro = GameData.config.intro;
        const container = this.elements.introText;

        intro.forEach((line, index) => {
            const p = document.createElement('p');
            p.className = 'intro-line';
            p.textContent = line;
            p.style.animationDelay = `${index * 0.4}s`;
            container.appendChild(p);

            setTimeout(() => p.classList.add('show'), index * 400 + 100);
        });

        setTimeout(() => {
            this.elements.startBtn.classList.remove('hidden');
            this.elements.startBtn.classList.add('fade-in');
        }, intro.length * 400 + 800);
    },

    // ========== 游戏流程 ==========

    startGame() {
        this.elements.introScreen.classList.add('hidden');
        this.elements.gameScreen.classList.remove('hidden');
        this.elements.gameScreen.classList.add('scene-transition');

        // 重置状态
        this.stats = { stability: 100, trust: 50, deception: 0, pressure: 0 };
        this.stabilityState = 'stable';
        this.choiceHistory = [];
        this.flags = {};
        this.pathType = null;
        this.updateStatsDisplay();

        this.loadScene('intro');
    },

    // 获取当前稳定性状态
    getStabilityState() {
        const s = this.stats.stability;
        if (s >= 70) return 'stable';
        if (s >= 40) return 'strained';
        if (s >= 15) return 'cracking';
        return 'collapse';
    },

    // 加载场景
    loadScene(sceneId) {
        // 特殊处理：结局选择
        if (sceneId === 'ending_final') {
            this.determineEnding();
            return;
        }

        const scene = GameData.scenes[sceneId];
        if (!scene) {
            console.error('Scene not found:', sceneId);
            return;
        }

        this.currentScene = scene;
        this.dialogueIndex = 0;

        // 更新位置
        if (scene.location) {
            this.elements.locationTag.textContent = scene.location;
            this.elements.locationTag.classList.remove('hidden');
        } else {
            this.elements.locationTag.classList.add('hidden');
        }

        // 清空内容
        this.elements.narrativeTitle.innerHTML = '';
        this.elements.narrativeText.innerHTML = '';
        this.elements.dialogueArea.innerHTML = '';
        this.elements.dialogueArea.classList.add('hidden');
        this.elements.narrativeText.classList.remove('hidden');
        this.elements.optionsContainer.innerHTML = '';

        // 添加场景切换动画
        this.elements.gameScreen.classList.remove('scene-transition');
        void this.elements.gameScreen.offsetWidth;
        this.elements.gameScreen.classList.add('scene-transition');

        // 根据场景类型处理
        if (scene.type === 'ending') {
            this.showEnding(scene);
        } else if (scene.type === 'narration') {
            this.showNarration(scene);
        } else if (scene.type === 'dialogue') {
            this.showDialogue(scene);
        }
    },

    // ========== 叙述场景 ==========

    async showNarration(scene) {
        this.elements.sceneTag.querySelector('span').textContent = '叙述';

        const container = document.createElement('div');
        container.className = 'narrative-container';
        container.style.opacity = '0';
        container.style.transition = 'opacity 0.8s ease-out';

        for (let i = 0; i < scene.content.length; i++) {
            const line = scene.content[i];

            const p = document.createElement('p');
            p.className = 'mb-4 text-slate-200';

            if (i === 0) {
                p.className += ' text-xl md:text-2xl font-bold text-slate-100 mb-6';
            }

            p.textContent = line;
            container.appendChild(p);
        }

        this.elements.narrativeText.innerHTML = '';
        this.elements.narrativeText.appendChild(container);

        await this.delay(50);
        container.style.opacity = '1';

        await this.delay(800);
        this.showChoices(scene.choices);
    },

    // ========== 对话场景 ==========

    async showDialogue(scene) {
        this.elements.sceneTag.querySelector('span').textContent = scene.location || '对话';
        this.elements.narrativeText.classList.add('hidden');
        this.elements.dialogueArea.classList.remove('hidden');

        await this.showNextDialogue(scene);
    },

    async showNextDialogue(scene) {
        if (this.dialogueIndex >= scene.content.length) {
            this.showChoices(scene.choices);
            return;
        }

        const dialogue = scene.content[this.dialogueIndex];
        const div = document.createElement('div');
        div.className = 'dialogue-enter mb-4';

        const character = GameData.characters[dialogue.speaker];
        const speakerName = character?.name || dialogue.speaker;
        const speakerColor = character?.color || '#e8e6e3';

        if (dialogue.speaker !== 'narrator') {
            const speaker = document.createElement('div');
            speaker.className = 'text-sm mb-1 font-display';
            speaker.style.color = speakerColor;
            speaker.textContent = speakerName;
            div.appendChild(speaker);
        }

        const text = document.createElement('div');
        text.className = 'text-slate-300 pl-4 border-l-2 border-slate-700';
        div.appendChild(text);

        this.elements.dialogueArea.appendChild(div);

        await this.typeText(text, dialogue.text);

        this.dialogueIndex++;

        if (this.dialogueIndex < scene.content.length) {
            this.showContinueButton(() => {
                this.elements.optionsContainer.innerHTML = '';
                this.showNextDialogue(scene);
            });
        } else {
            this.showChoices(scene.choices);
        }
    },

    // ========== 选项 ==========

    showChoices(choices) {
        this.elements.optionsContainer.innerHTML = '';

        choices.forEach((choice, index) => {
            const btn = this.createChoiceButton(choice, index);
            this.elements.optionsContainer.appendChild(btn);
        });
    },

    createChoiceButton(choice, index) {
        const btn = document.createElement('button');
        btn.className = 'option-card group flex flex-col text-left p-5 border border-slate-700 hover:border-amber-500/50 bg-slate-900 transition-all duration-300 relative overflow-hidden';

        btn.innerHTML = `
            ${choice.hint ? `<span class="text-[10px] text-slate-500 font-bold tracking-widest uppercase mb-2 block">「${choice.hint}」</span>` : ''}
            <h3 class="text-slate-100 text-base md:text-lg font-bold group-hover:text-white mb-2">${choice.text}</h3>
            ${this.getEffectsPreview(choice.effects)}
            <div class="absolute bottom-0 left-0 h-0.5 w-0 bg-amber-500 group-hover:w-full transition-all duration-500"></div>
        `;

        btn.onclick = () => this.selectChoice(choice);

        return btn;
    },

    getEffectsPreview(effects) {
        if (!effects) return '';

        let html = '<div class="mt-3 flex flex-wrap gap-2 text-[10px] font-display">';
        for (const [key, value] of Object.entries(effects)) {
            if (value === 0) continue;
            const sign = value > 0 ? '+' : '';
            const colorClass = this.getEffectColor(key, value);
            const label = this.getEffectLabel(key);
            html += `<span class="px-2 py-1 rounded ${colorClass}">${label} ${sign}${value}</span>`;
        }
        html += '</div>';
        return html;
    },

    getEffectColor(key, value) {
        if (key === 'trust') {
            return value > 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400';
        } else if (key === 'selfDeception') {
            return value > 0 ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-700 text-slate-400';
        } else if (key === 'realityPressure') {
            return value > 0 ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400';
        }
        return 'bg-slate-700 text-slate-400';
    },

    getEffectLabel(key) {
        const labels = {
            trust: '信任',
            selfDeception: '自欺',
            realityPressure: '矛盾'
        };
        return labels[key] || key;
    },

    showContinueButton(callback) {
        const btn = document.createElement('button');
        btn.className = 'option-card col-span-full group flex items-center justify-center p-4 border border-slate-700 hover:border-amber-500/50 bg-slate-900 transition-all duration-300';
        btn.innerHTML = `
            <span class="text-slate-400 group-hover:text-amber-400 transition-colors">继续...</span>
        `;
        btn.onclick = callback;
        this.elements.optionsContainer.innerHTML = '';
        this.elements.optionsContainer.appendChild(btn);
    },

    // ========== 选择处理 ==========

    async selectChoice(choice) {
        // 记录选择
        this.choiceHistory.push({
            scene: this.currentScene.id,
            choice: choice.text,
            hint: choice.hint
        });

        // 记录路径标记
        if (choice.flag) {
            this.flags[choice.flag] = true;

            // 更新路径类型
            if (choice.flag.includes('honest')) {
                this.pathType = 'honest';
            } else if (choice.flag.includes('deception') || choice.flag.includes('deny')) {
                this.pathType = 'deception';
            } else if (choice.flag.includes('minimize') || choice.flag.includes('secret')) {
                this.pathType = 'gray';
            }
        }

        // 应用效果
        if (choice.effects) {
            this.applyEffects(choice.effects);
        }

        // 显示回应或加载下一场景
        if (choice.response && choice.response.length > 0) {
            await this.showResponse(choice.response, choice.nextScene);
        } else {
            this.loadScene(choice.nextScene);
        }
    },

    async showResponse(response, nextScene) {
        this.elements.optionsContainer.innerHTML = '';

        for (const dialogue of response) {
            const div = document.createElement('div');
            div.className = 'dialogue-enter mb-4';

            const character = GameData.characters[dialogue.speaker];
            const speakerName = character?.name || dialogue.speaker;
            const speakerColor = character?.color || '#e8e6e3';

            if (dialogue.speaker !== 'narrator') {
                const speaker = document.createElement('div');
                speaker.className = 'text-sm mb-1 font-display';
                speaker.style.color = speakerColor;
                speaker.textContent = speakerName;
                div.appendChild(speaker);
            }

            const text = document.createElement('div');
            text.className = 'text-slate-300 pl-4 border-l-2 border-slate-700';
            div.appendChild(text);

            this.elements.dialogueArea.appendChild(div);

            await this.typeText(text, dialogue.text);
            await this.delay(300);
        }

        this.showContinueButton(() => this.loadScene(nextScene));
    },

    // ========== 效果处理 ==========

    applyEffects(effects) {
        for (const [key, value] of Object.entries(effects)) {
            if (key === 'trust') {
                this.stats.trust = Math.max(0, Math.min(100, this.stats.trust + value));
            } else if (key === 'selfDeception') {
                this.stats.deception = Math.max(0, Math.min(100, this.stats.deception + value));
            } else if (key === 'realityPressure') {
                this.stats.pressure = Math.max(0, Math.min(100, this.stats.pressure + value));
            }
        }

        // 计算稳定性
        this.stats.stability = Math.max(0, 100 - this.stats.deception - this.stats.pressure / 2);

        // 更新稳定性状态
        this.stabilityState = this.getStabilityState();

        this.updateStatsDisplay();
    },

    updateStatsDisplay() {
        const state = this.stabilityState;

        // 稳定性
        this.elements.statStability.innerHTML = `${this.stats.stability}<span class="text-sm font-normal text-slate-600">%</span>`;
        this.elements.barStability.style.width = `${this.stats.stability}%`;

        if (state === 'collapse') {
            this.elements.barStability.className = 'h-full bg-red-500 transition-all duration-500';
        } else if (state === 'cracking') {
            this.elements.barStability.className = 'h-full bg-orange-500 transition-all duration-500';
        } else if (state === 'strained') {
            this.elements.barStability.className = 'h-full bg-yellow-500 transition-all duration-500';
        } else {
            this.elements.barStability.className = 'h-full bg-amber-500 transition-all duration-500';
        }

        // 自我欺骗
        this.elements.statDeception.innerHTML = `${this.stats.deception}<span class="text-sm font-normal text-slate-600">%</span>`;
        this.elements.barDeception.style.width = `${this.stats.deception}%`;

        // 信任
        this.elements.statTrust.innerHTML = `${this.stats.trust}<span class="text-sm font-normal text-slate-600">%</span>`;
        this.elements.barTrust.style.width = `${this.stats.trust}%`;

        // 现实矛盾
        this.elements.statPressure.innerHTML = `${this.stats.pressure}<span class="text-sm font-normal text-slate-600">%</span>`;
        this.elements.barPressure.style.width = `${this.stats.pressure}%`;

        // 添加变化动画
        [this.elements.statStability, this.elements.statTrust, this.elements.statDeception, this.elements.statPressure].forEach(el => {
            el.classList.remove('value-change');
            void el.offsetWidth;
            el.classList.add('value-change');
        });
    },

    // ========== 结局判定 ==========

    determineEnding() {
        const { trust, deception, pressure } = this.stats;
        const path = this.pathType;

        let endingId;

        // 根据路径和数值决定结局
        if (path === 'honest' || deception < 20) {
            // 诚实路线
            if (trust >= 30) {
                endingId = 'honest_redemption';
            } else {
                endingId = 'honest_fired';
            }
        } else if (path === 'deception' || deception >= 50) {
            // 自欺路线
            if (pressure >= 40) {
                endingId = 'deception_exposed';
            } else {
                endingId = 'deception_cocoon';
            }
        } else if (path === 'gray' || (deception >= 20 && deception < 50)) {
            // 模糊路线
            if (trust >= 20) {
                endingId = 'gray_peace';
            } else {
                endingId = 'gray_compromise';
            }
        } else {
            // 迷失路线
            endingId = 'lost_drift';
        }

        this.loadEnding(endingId);
    },

    loadEnding(endingId) {
        const ending = GameData.endings[endingId];
        if (!ending) {
            console.error('Ending not found:', endingId);
            return;
        }

        this.showEnding(ending);
    },

    // ========== 结局显示 ==========

    showEnding(scene) {
        this.elements.gameScreen.classList.add('hidden');
        this.elements.endingScreen.classList.remove('hidden');
        this.elements.endingScreen.classList.add('scene-transition');

        this.elements.endingTitle.textContent = scene.title;

        this.elements.endingText.innerHTML = '';
        for (const line of scene.content) {
            const p = document.createElement('p');
            p.textContent = line;
            this.elements.endingText.appendChild(p);
        }

        this.elements.endingText.classList.add('narrative-fade');
    },

    // ========== 工具函数 ==========

    typeText(element, text, speed = this.typingSpeed) {
        return new Promise(resolve => {
            if (!text) {
                resolve();
                return;
            }

            this.isTyping = true;
            element.classList.add('typing-cursor');
            let index = 0;

            const type = () => {
                if (index < text.length) {
                    element.textContent += text.charAt(index);
                    index++;
                    setTimeout(type, speed);
                } else {
                    element.classList.remove('typing-cursor');
                    this.isTyping = false;
                    resolve();
                }
            };

            type();
        });
    },

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    // ========== 历史记录 ==========

    showHistory() {
        this.elements.historyModal.classList.remove('hidden');

        if (this.choiceHistory.length === 0) {
            this.elements.historyList.innerHTML = '<p class="text-slate-400 text-sm">暂无抉择记录</p>';
            return;
        }

        this.elements.historyList.innerHTML = this.choiceHistory.map((item, index) => `
            <div class="p-3 bg-slate-900 border border-slate-700 rounded mb-2">
                <div class="text-slate-500 text-xs mb-1">选择 ${index + 1}</div>
                <div class="text-slate-100 text-sm">${item.choice}</div>
                ${item.hint ? `<div class="text-amber-400 text-xs mt-1">「${item.hint}」</div>` : ''}
            </div>
        `).join('');
    },

    closeHistory() {
        this.elements.historyModal.classList.add('hidden');
    }
};

// 全局函数
function showHistory() {
    Game.showHistory();
}

function closeHistory() {
    Game.closeHistory();
}

function restartGame() {
    Game.elements.endingScreen.classList.add('hidden');
    Game.elements.introScreen.classList.remove('hidden');
    Game.elements.introText.innerHTML = '';
    Game.elements.startBtn.classList.add('hidden');
    Game.showIntro();
}

// 启动游戏
document.addEventListener('DOMContentLoaded', () => {
    Game.init();
});
