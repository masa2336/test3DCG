function setup() {
  createCanvas(480, 480);
}

function draw() {
  let V = [
    [0, 0, 0],
    [1, 0, 0],
    [0, 0, 1],
    [0, -1, 0]
  ];
  let F = [
    [0, 2, 1],
    [0, 1, 3],
    [1, 2, 3],
    [0, 3, 2]
  ];
  
  let ft = (A,x,y,z) => A.map(a => [a[0]+x, a[1]+y, a[2]+z]);
  let fs = (A,x,y,z) => A.map(a => [x*a[0], y*a[1], z*a[2]]);
  let fr = (A,r) => A.map(
    a => [
      a[0]*cos(r) + a[2]*sin(r),
      a[1],
      -a[0]*sin(r) + a[2]*cos(r)
    ]
  );
  let fp = (A) => A.map(a => [a[0]/a[2], a[1]/a[2]]);
  let fc = (A,w,h) => A.map(a => [w*a[0]/2+w/2, h*a[1]/2+h/2]);
  
  let t = millis()/1000;
  let S = V;
  S = fr(S, 3*t);
  S = ft(S, mouseX/120-2, 0.5, -mouseY/240+4);
  let C = S;
  S = fp(S);
  S = fc(S, width, height);
  
  C = fs(C, 1, 0, 1);
  C = ft(C, 0, 1.5, 0);
  C = fp(C);
  C = fc(C, width, height);
  
  background(200);
  strokeWeight(3);
  for(let i=0; i<F.length; i++) {
    fill(0);
    triangle(...C[F[i][0]], ...C[F[i][1]], ...C[F[i][2]]);
    noFill();
    triangle(...S[F[i][0]], ...S[F[i][1]], ...S[F[i][2]]);
  }
}