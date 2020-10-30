
app=new Vue({
    el:'#app',
    data:{
        points:'',
        sides:4,
        radius:150,
        rx:150,
        ry:100,
        type:'polygon',
        shapes:[],
        key:0,
        shift:0,
        colors:[],
        shapesTranslate:{
            transform:'translateX(0%)'
        }
    },
    methods:{
        getPoints(){
            let angle=90;
            const ang=360/this.sides;
            let points="";
            for(let i=0;i<this.sides;i++){
               const x=Math.cos((angle*Math.PI)/180)*(130);
               const y=Math.sin((angle*Math.PI)/180)*(130);
               const dx=150+x;
               const dy=Math.abs(y-150);
               points+=dx+" "+dy+" ";
               angle+=ang;
            }
            return points;
        },
        draw(){
          if(this.type==='polygon'){
               const shape={
                   key:this.key,
                   points:this.getPoints(),
                   type:'polygon',
                   dash:{
                    strokeDasharray:this.polygonPerimeter(this.sides,130),
                    strokeDashoffset:this.polygonPerimeter(this.sides,130)
                   }
               }
               this.shapes.push(shape);
          }  
          else if(this.type==='ellipsis'){
              const shape={
                  key:this.key,
                  type:'ellipsis',
                  rx:this.rx,
                  ry:this.ry,
                  dash:{
                    strokeDasharray:this.ellipsePermiter(this.rx,this.ry),
                    strokeDashoffset:this.ellipsePermiter(this.rx,this.ry)
                  }
              }
              this.shapes.push(shape);
          }else{
              const shape={
                  key:this.key,
                  radius:this.radius,
                  type:'circle',
                  dash:{
                    strokeDasharray:this.circumference(this.radius),
                    strokeDashoffset:this.circumference(this.radius)
                  }
              }
              this.shapes.push(shape);
          }
          this.colors.push("#000000");
          this.shift+=50;
        //   this.shapesTranslate.transform=`translateX(${this.shift}%)`
          this.key++;
        },
        polygonPerimeter(n,r){
             return 2*n*r*Math.sin((Math.PI)/n);
        },
        circumference(r){
            return Math.PI*2*r;
        },
        ellipsePermiter(a,b){
            return 2*Math.PI*Math.sqrt(((a*a)+(b*b))/2)
        }
    },
})