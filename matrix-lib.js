// Authors: Linus Nadler, Dominik Dreiheller
// License: Apache 2.0 http://www.apache.org/licenses/LICENSE-2.0.html
// Contents: Library fort Matrix Math

class Matrix{
  constructor(n, k){
    this.m = new Array(n).fill(new Array(k).fill(0));
    console.table(this.m);
  }
}
