class CalcController2 {

    constructor(){
        
        this._audio = new Audio('click.mp3')
        this._audioOnOff = false;
        this._lastoperator ='';
        this._lastNumber ='';
        this._operation = [];
        this._locale = 'sa'
        this._displayCalcEl = document.querySelector("#display");
        this._displayTimeEl = document.querySelector("#hora");
        this._displayDateEl = document.querySelector("#data");
        this._currentDate;
        this.initialize(); 
        this.initButtonsEvent();
        this.initkeyboard();

    }
    initialize(){

        this.setDisplayDateTime()
        
    //set interval...
        setInterval(()=>{

        this.setDisplayDateTime()

        },1000)
        this. setLastNumbertoDisplay()

        document.querySelectorAll(".btn-ac").forEach(btn=>{

           btn.addEventListener('dblclick', e =>{
               this.toggleAudio();
           })
        })
    }
    toggleAudio(){

        this._audioOnOff = !this._audioOnOff;
    }
    playAudio(){

        if(this._audioOnOff){
            this._audio.currentTime = 0;
        this._audio.play();

        }



    }
    // adicionando varios eventos //

    addEventListenerAll(element, events, fn){

        events.split(' ').forEach(event => {

            element.addEventListener(event, fn, false)
        });

    }
    //metodo do ac e ce //
    clearAll(){

        this._operation = [];
        this._lastNumber = '';
        this._lastoperator = '';
        this.setLastNumbertoDisplay();
    }
    clearEntry(){
    
        this._operation.pop(); 
        this.setLastNumbertoDisplay();
    }
    setError(){

      this.displayCalc = "Error"
    }
    //adicionando operaçoes no array

    getLastOperation(){

        return this._operation[this._operation.length -1]

    }
    // metodo isoperator
    isoperator(value){

       return (['+','-','*','%','/'].indexOf(value)>-1)
    }

     //METODO SETLASTOPERATION//
     setLastOperation(value){

        this._operation[this._operation.length -1] = value

     }
     //Metodo push//
     Pushoperator(value){
        this._operation.push(value);

        if(this._operation.length >3){
            
            
            this.calc()
        }        
     }
     getresult(){
       try {
           return eval(this._operation.join(""))
       } catch(e){
            setTimeout(()=>{
                this.setError()

            },1);
           


       }
        
     }
     //Metodo calc;
     calc(){

        let last= ''
        this._lastoperator = this.getLastItem()

        if(this._operation.length <3){

            let firstItem = this._operation[0]
            this._operation = [firstItem, this._lastoperator,this._lastNumber]
        }

        if(this._operation.length>3){
            last = this._operation.pop()

            
            this._lastNumber = this.getresult()
        }else if(this._operation.length == 3){

            
            this._lastNumber = this.getLastItem(false)


          }
          

        let result = this.getresult()

        if(last == "%"){

            result /=100;
            this._operation =[result]

        }else{

            this._operation = [result];
            if(last) this._operation.push(last)
        }

        

        this.setLastNumbertoDisplay();

     }
     getLastItem(isoperator = true){
        
        let lastItem;

        for(let i = this._operation.length-1;i >= 0; i--){


            if(this.isoperator(this._operation[i])== isoperator){
                lastItem = this._operation[i]
                break;
            }

          }
          if(!lastItem){

            lastItem = (isoperator) ? this._lastoperator :this._lastNumber;
          }

          return lastItem;
     }
     //Metodo to set lastnumbertoDisplay
      setLastNumbertoDisplay(){
         
        let lastNumber  = this.getLastItem(false);
        
        if (!lastNumber) lastNumber=0;
        this.displayCalc = lastNumber;

     }

    //metodo para add a operacaçao//
    addoperation(value){
        
        if(isNaN(this.getLastOperation())){
           
            //se o ultimo digito for operador//
            if(this.isoperator(value)){
              
          this.setLastOperation(value)

            }else{
                this.Pushoperator(value);
                this.setLastNumbertoDisplay();
                
            }

        }else{
            if(this.isoperator(value)){
                this.Pushoperator(value)
                

            }else{
                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation(newValue);

                this.setLastNumbertoDisplay();
            }

        }
      
    }
    addDot(){

        let lastOperation = this.getLastOperation()
        if(typeof lastOperation ==='string' && lastOperation.split('').indexOf('.')> -1) return;
        if(this.isoperator(lastOperation)|| !lastOperation){

            this.Pushoperator('0.')
        }else{
            this.setLastOperation(lastOperation.toString() + '.')
        }
        this.setLastNumbertoDisplay()
        
    }
    initkeyboard(){

        document.addEventListener('keyup', e=>{

            this.playAudio();

            switch(e.key){
                // all clear
                case 'Escape':
                this.clearAll();
                break;
            // limpa o ultimo
                case 'Backspace':
            this.clearEntry()
                break;
                // soma
                case '+':
                case '-':
                case '*':
                case '/':
                case '%':

                this.addoperation(e.key);
                break;
                //igual//
            case 'Enter':
            case '=':
                this.calc() 
             break;
            case '.':
            case ',':
                this.addDot();
             break;
                
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                    this.addoperation(parseInt(e.key))     
                    break;
                case 'c':
                    if(e.ctrlKey) this.copyToClpboard()
                    break
    
    
            }
    
        })
    
    }
    // criando o switch na calculadora
    execBtn(value){

        this.playAudio();

      switch(value){
            // all clear
            case 'ac':
            this.clearAll();
            break;
        // limpa o ultimo
            case 'ce':
        this.clearEntry()
            break;
            // soma
            case 'soma':
            this.addoperation('+');
            break;
            //subtracao//
            case 'subtracao':
            this.addoperation('-');
            break;
            //divisao//
            case 'divisao':
             this.addoperation('/');
            break;
            //multiplicacao//
            case 'multiplicacao':
                this.addoperation('*');
            break;
            //porcento
            case 'porcento':
                this.addoperation('%');
            break;
            //igual//
            case 'igual':
                this.calc()
             break;
            case "ponto":
                this.addDot();
             break;

            
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addoperation(parseInt(value));
            
                break;
        
            default:
            this.setError()
            break;

        }

    }

    //Para eventos do botao//
    initButtonsEvent(){

    
       let buttons = document.querySelectorAll("#buttons > g, #parts >g");

       buttons.forEach((btn, index)=>{

            this.addEventListenerAll(btn,"click drag", e =>{

            let textBtn =btn.className.baseVal.replace("btn-","");
            this.execBtn(textBtn);

        });

         //Adicionado evento Mouseover//
        
         this.addEventListenerAll(btn, "mouseover mouseup mousedown", e =>{

            btn.style.cursor ="pointer"

        });

       });

    }

    // Metodo//
    setDisplayDateTime(){

       this.displayDate = this.currentDate.toLocaleDateString(this._locale)
         this.displayTime = this.currentDate.toLocaleTimeString(this._locale)

                }
    //actualizando os dados no display da calc//
    
        get displayDate(){
            return this._displayDateEl.innerHTML;
        }
        set displayDate(value){
            return this._displayDateEl.innerHTML = value;
        }

        get displayTime(){
            return this._displayTimeEl.innerHTML ;
        }
        set displayTime(value){
            return this._displayTimeEl.innerHTML = value;
        }
    
    //display da calculadora

    get displayCalc(){

        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(value){

        if(value.toString().length >10){
           this.setError();
            return false;

        }

        this._displayCalcEl.innerHTML = value;
    }
    
    
    //display da data e hora

    get currentDate(){
        return new Date();
    }

    set currentDate(value){

        this._currentDate = value
    }


}