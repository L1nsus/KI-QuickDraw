class Matrix{
  constructor(n, k){
    this.m = new Array(n).fill(new Array(k).fill(0));
    console.table(this.m);
  }
}
