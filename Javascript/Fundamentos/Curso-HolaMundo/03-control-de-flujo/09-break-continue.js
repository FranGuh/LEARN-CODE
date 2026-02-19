let i = 0;
while (i < 6) {
    i++;
    if (i === 2){
        continue; // salta la iteración.
    }
    if (i === 4){
        break; // rompe el loop.
    }
    console.log(i);

}