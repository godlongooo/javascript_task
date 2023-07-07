// =で計算済みはfalseと設定 未計算はtrue
let is_calc = false;
// .関連のデータ取得
let dec = document.getElementById("decimal");
// 番号関連のデータ取得
let num = document.getElementById("number");
// 演算子のデータ取得
let ope0 = document.getElementById("operator-0");
let ope1 = document.getElementById("operator-1");
let ope2 = document.getElementById("operator-2");
let ope3 = document.getElementById("operator-3");

// 初期表示
window.addEventListener("DOMContentLoaded", function() {
    // データ取得
    result = document.getElementById("display");
});

// ACキー押下
function ac_click(){
    // acを押したら初期化
    result.value = "0";
    // acを押したら.を押せるように
    dec.disabled = false;

    // 演算子を押せないようにする
    ope0.disabled = true;
    ope1.disabled = true;
    ope2.disabled = true;
    ope3.disabled = true;
}

// 数字キー押下
function num_click(val){

    // .キーを押せるようにする
    dec.disabled = false;
    
    // 演算子を押せるようにする
    ope0.disabled = false;
    ope1.disabled = false;
    ope2.disabled = false;
    ope3.disabled = false;


    // 計算済みの場合、数字を押したら初期化
    if(is_calc)  result.value = "0"; 
    // is_calcがtrueの場合があるため追記
    is_calc = false; 

    // 初期化後、”0″が入力された場合、resultに”0″を設定
    if(result.value == "0" && val == "0"){
    }
    //初期化後、”00”が入力された場合、resultに”0”を設定
    else if(result.value == "0" && val == "00"){
    result.value = "0";
    }
    //初期化後、上記以外の数字が入力された場合、resultに入力値を設定
    else if(result.value == "0"){
    result.value = val;
    }
    //それ以外は直接resultに入力値を追加
    else{
    result.value += val;
    }

}

// .キー押下
function dec_click(val){
    // 連続入力できないように
    dec.disabled = true;

    // 演算子を押せないようにする
    ope0.disabled = true;
    ope1.disabled = true;
    ope2.disabled = true;
    ope3.disabled = true;

    //初期化後、”.”が入力された場合、0に”.”を追加
    if(result.value == "0" && val == "."){
    result.value += val;
    }
    //番号が入力された際、入力値に"."を追加できるように
    else if(num_click(val)){
    result.value += val;
    }
}

// 演算子キー押下
function ope_click(val){
    // 計算済みの場合に連続して計算できるように
    if(is_calc)  
    // is_calcがtrueの場合があるため追記
    is_calc = false; 

    if(is_ope_last()){
    //演算子の切り替えを可能に(押し間違え回避)
    result.value = result.value.slice(0,-1); + val;
    } else {
    //それ以外は直接resultに入力値を追加
    result.value += val;
    }
}


// =キークリック
function equal_click(){
    // 演算子が入力されていた場合カットする
    if(is_ope_last())  result.value = result.value.slice(0, -1);
    // 掛け算と割り算の記号を対応させる
    let temp = new Function("return " + result.value.replaceAll("×", "*").replaceAll("÷", "/"))();
    // 計算できない場合 エラー表示
    if(temp == Infinity || Number.isNaN(temp)){
    result.value = "Error";
    }else{
    result.value = temp;
    is_calc = true;
    }
}
// 入力されている値が演算子かどうか判定
function is_ope_last(){
    return ["+","-","×","÷"].includes(result.value.toString().slice(-1));
}