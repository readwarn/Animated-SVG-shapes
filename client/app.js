app=new Vue({
    el:'#app',
    data:{
        points:'',
        loading:true,
        errorR:'',
        errorRx:'',
        errorRy:'',
        sides:4,
        radius:140,
        rx:140,
        ry:100,
        type:'polygon',
        shapes:[],
        key:0,
        shift:0,
        pallete:false,
        shapeTranslate:{
           transform:'translateX(0)'
        }
    },
    methods:{
        getPoints(sides,length){
            let angle=90;
            const ang=360/sides;
            let points="";
            for(let i=0;i<sides;i++){
               const x=Math.cos((angle*Math.PI)/180)*(length);
               const y=Math.sin((angle*Math.PI)/180)*(length);
               const dx=150+x;
               const dy=Math.abs(y-150);
               points+=dx+" "+dy+" ";
               angle+=ang;
            }
            return points;
        },
        draw(){
          if(this.radius>140 || this.rx>140 || this.ry>140){
                 if(this.radius>140){
                     this.errorR="radius should be less than 140"
                 }else{
                    this.errorR=""
                 }
                 if(this.rx>140){
                    this.errorRx="radiusX should be less than 140"
                 }else{
                    this.errorRx=""
                 }
                 if(this.ry>140){
                    this.errorRy="radiusY should be less than 140"
                }else{
                    this.errorRy=""
                 }
          }else{
            this.errorR="";this.errorRx="";this.errorRy=""  
            this.pallete=false;
            this.shapeTranslate.transform=`translateX(0)`;
            this.shift=0;
            if(this.type==='polygon'){
                 const shape={
                     key:this.key,
                     points:this.getPoints(this.sides,130),
                     type:'polygon',
                     color:"#000000",
                     sides:this.sides,
                     dash:{
                      strokeDasharray:this.polygonPerimeter(this.sides,130),
                      strokeDashoffset:this.polygonPerimeter(this.sides,130)
                     }
                 }
                 this.shapes.push(shape);
                 axios.post('https://vast-lake-07220.herokuapp.com/shapes',shape).then((response)=>{
                     console.log(shape);
                 })
            }  
            else if(this.type==='ellipsis'){
                const shape={
                    key:this.key,
                    type:'ellipsis',
                    color:"#000000",
                    rx:this.rx,
                    ry:this.ry,
                    dash:{
                      strokeDasharray:this.ellipsePermiter(this.rx,this.ry),
                      strokeDashoffset:this.ellipsePermiter(this.rx,this.ry)
                    }
                }
                this.shapes.push(shape);
                axios.post('https://vast-lake-07220.herokuapp.com/shapes',shape).then((response)=>{
                     console.log(shape);
                 })
            }else{
                const shape={
                    key:this.key,
                    radius:this.radius,
                    color:"#000000",
                    type:'circle',
                    dash:{
                      strokeDasharray:this.circumference(this.radius),
                      strokeDashoffset:this.circumference(this.radius)
                    }
                }
                this.shapes.push(shape);
                 axios.post('https://vast-lake-07220.herokuapp.com/shapes',shape).then((response)=>{
                     console.log(shape);
                 });
            }
            this.key++;
          }
        },
        polygonPerimeter(n,r){
             return 2*n*r*Math.sin((Math.PI)/n);
        },
        circumference(r){
            return Math.PI*2*r;
        },
        ellipsePermiter(a,b){
            return 2*Math.PI*Math.sqrt(((a*a)+(b*b))/2)
        },
        resizeL(event,key){
           this.shapes[key].points=this.getPoints(this.shapes[key].sides,parseInt(event.target.value));
           this.shapes[key].dash={
                strokeDasharray:this.polygonPerimeter(this.shapes[key].sides,parseInt(event.target.value)),
                strokeDashoffset:this.polygonPerimeter(this.shapes[key].sides,parseInt(event.target.value))
           }
        },
        resizeR(event,key){
            this.shapes[key].radius=parseInt(event.target.value);
            this.shapes[key].dash={
                strokeDasharray:this.circumference(parseInt(event.target.value)),
                strokeDashoffset:this.circumference(parseInt(event.target.value))
            }
        },
        resizeRx(event,key){
              this.shapes[key].rx=parseInt(event.target.value);
              this.shapes[key].dash={
                  strokeDasharray:this.ellipsePermiter(parseInt(event.target.value),this.ry),
                  strokeDashoffset:this.ellipsePermiter(parseInt(event.target.value),this.ry)
              }
        },
        resizeRy(event,key){
            this.shapes[key].ry=parseInt(event.target.value);
            this.shapes[key].dash={
                strokeDasharray:this.ellipsePermiter(this.rx, parseInt(event.target.value)),
                strokeDashoffset:this.ellipsePermiter(this.rx, parseInt(event.target.value))
            }
        },
        slide(direction){
            if(direction==='left'){
                this.shift-=280;
                this.shapeTranslate.transform=`translateX(${this.shift}px)`
            }
            else{
                this.shift+=280;
                this.shapeTranslate.transform=`translateX(${this.shift}px)`
            }
        }
    },
    created(){
        axios.get('https://vast-lake-07220.herokuapp.com/shapes').then(response=>{
            this.shapes=response.data;
            this.loading=false;
            this.key=response.data.length;
            console.log(response.data);
        })
    }
})