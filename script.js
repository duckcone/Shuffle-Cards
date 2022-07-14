var vm = new Vue({
    el: "#app",
    data: {
        gather: false,
        state: "Start the Game!",
        question:null,
        mode:"",
        count:0,
        symbols: [
            { label: "spades", symbol: "♠" },
            { label: "hearts", symbol: "♥" },
            { label: "diamonds", symbol: "♦" },
            { label: "clubs", symbol: "♣" }
        ],
        cards: [
            { id: 1, label: "spades", open: false },
            { id: 2, label: "hearts", open: false },
            { id: 3, label: "clubs", open: false },
            { id: 4, label: "diamonds", open: false }

        ]
    },
    methods: {
        turnAll(state){
            this.cards.forEach(card => card.open=state)
        },
        shuffle() {
            let newOrder = [1, 2, 3, 4].sort((a, b) =>
                Math.random() > 0.5 ? 1 : -1
            );
            this.cards.forEach((card, cid) => (card.id = newOrder[cid]));
        },
        getSymbol(label) {
            let result = this.symbols.find((s) => s.label == label);
            return result ? result.symbol : label;
        },
        startGame(){
            this.mode="";
            this.question = this.symbols[parseInt(Math.random()*4)];
            // 蓋上卡牌
            this.turnAll(false);
            // 綁定遊戲之後再加入，收起所有的卡牌
            this.getSymbol.ather = true;
            // 告知使用者準備開始遊戲
            this.state = "Ready to Play!";
            // 告知使用者，發陪，question
            setTimeout(()=>{
                // 發牌
                this,gather = false;
                // 告知題目
                this.state = "接下來的任務:";
            }, 2000);
            // 公布題目
            setTimeout(()=>{
                // 翻牌
                this.turnAll(true);
                // 告訴花色
                this.state = "找: " + this.question.label + this.question.symbol;
                
            }, 3000);
            // 準備開始
            setTimeout(()=>{
                // 蓋排
                this.turnAll(false);
                // 告訴花色
                this.state = "Get Ready...";
                
            }, 4000);
            // 洗牌
            this.count = 0;
            setTimeout(()=>{
                let startShuffle=() =>{

                    this.shuffle();
                    console.log("shuffle!" + this.count);
                    if (this.count ++ < 5)
                    {
                        setTimeout(startShuffle, 1000);
                    }else{
                        // 切換到使用者模式
                        this.state = "Pick up" + this.question.label + " " + this.question.symbol;
                        this.mode = "answer";
                    }
                }
                startShuffle();

            }, 5000);


        },
        // 使用者可以翻牌 this.mode = "answer"
        openCard(card){
            if(this.mode == "answer"){
                card.open = !card.open;
                if(card.label == this.question.label){
                    this.state = "OK! You find " + this.question.symbol+"!!";
                }else{
                    this.state = "Looser...";
                    setTimeout(()=>{
                        let card = this.getCard(this.question.label);
                        card.open = true;
                    }, 2000)


                }
            }
            setTimeout(()=>{this.startGame()},3000)
        },
        getCard(label){
            return this.cards.find(card => card.label == label);
        }
    },
    mounted(){
        this.startGame();
    }
})