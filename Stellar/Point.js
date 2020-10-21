class Point{
  
  constructor(x,y,isOn){
    this.x = x;
    this.y = y;
    if(isOn<1){this.isOn = 1;}
    else{this.isOn = 0;}
  }
  
  showMe(){
    stroke(255);
    fill(255);
    if(this.isOn==1){circle(this.x*size+size/2,this.y*size+size/2,10);}
  }
  
  getX(){return this.x;}	
  getY(){return this.y;}	

  find_nearest(){
    let matrix = [];
    for (let i = 0; i < cols; i++) {
      matrix[i]=[];
      for (let j = 0; j < rows; j++) {
        if(arr[i][j].isOn==1){matrix[i][j]=dist(this.x,this.y,i,j);}
        else{matrix[i][j]=rows*cols;}
      }
    }
    matrix[this.x][this.y]=rows*cols;
    return this.min_point(matrix);
  }
  
  dist(thisx,thisy,thatx,thaty){
    return int(sqrt((thisx-thatx)*(thisx-thatx)+(thisy-thaty)*(thisy-thaty)));
  }
  
  min_point(matrix){
    let result = rows*cols;
    let inti=0,intj=0;
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        if(matrix[i][j]<result){
          result=matrix[i][j];
          inti=i;intj=j;
        }
      }
    }
    return arr[inti][intj];
  }
  
  find_fartest(){
    let matrix = [];
    for (let i = 0; i < cols; i++) {
      matrix[i]=[];
      for (let j = 0; j < rows; j++) {
        if(arr[i][j].isOn==1){matrix[i][j]=dist(this.x,this.y,i,j);}
        else{matrix[i][j]=0;}
      }
    }
    matrix[this.x][this.y]=0;
    return this.max_point(matrix);
  }
  
  max_point(matrix){
    let result = 0;
    let inti=0,intj=0;
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        if(matrix[i][j]>result){
          result=matrix[i][j];
          inti=i;intj=j;
        }
      }
    }
    return arr[inti][intj];
  }
}
