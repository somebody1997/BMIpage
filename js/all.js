let submitBtn = document.querySelector('.submitBtn');
let refreshBtn = document.querySelector('.refreshBtn');
let inputHeight = document.querySelector('#height');
let inputWeight = document.querySelector('#weight');
let alertText = document.querySelector(".alertText");
let listtable = document.querySelector('.listtable'); 
let clearAll = document.querySelector('.clearAll');
let ststusList = [];
function refreshListTable(e){
    let listtable = document.querySelector('.listtable');
    let str='';
    statusList = JSON.parse(localStorage.getItem('statusList')) || [] ;
    for(let i = statusList.length-1; i >= 0; i--){
        str +=
        `
        <div class="listItem weight-${statusList[i].status}-border">
            <div class="listStatus">${statusList[i].statusText}</div>
            <div class="listBMI">
                <h5>BMI</h5>
                <p>${statusList[i].bmi}</p>
            </div>
            <div class="listWeight">
                <h5>weight</h5>
                <p>${statusList[i].weight}</p>
            </div>
            <div class="listHeight">
                <h5>height</h5>
                <p>${statusList[i].height}</p>
            </div>
            <div class="listDate">
                <h5>${statusList[i].date}</h5>
            </div>
            <div>
                <a href="#" class="listDelete"><img src="img/trash-can.svg" data-num = "${i}"></a>    
            </div>
        </div>
        `

    }
    listtable.innerHTML = str;
}
function heightCheck(e){
    let Height = inputHeight.Value;
    let Weight = inputHeight.Value;
    if(Height === "" || Height === " "){
        alertText.textContent = '您尚未填寫身高';
    } 
    else if( 0 > Height || Height>250){
        alertText.textContent = '請填寫 0-250以內的數字';
    }
    else if(isNaN(Height)){
        alertText.textContent = '身高請填寫數字';
    }
    else if(Weight === "" || Weight === " "){
        alertText.textContent = '您尚未填寫體重';
    } 
    else if( 0 > Weight || Weight>200){
        alertText.textContent = '請填寫 0-200以內的數字';
    }
    else if(isNaN(Weight)){
        alertText.textContent = '體重請填寫數字';
    }
    else{
        alertText.textContent = '';
    }
}
function weightCheck(e){
    let Height = inputHeight.value;
    let Weight = inputWeight.value;
    if(Weight === "" || Weight === " "){
        alertText.textContent = '您尚未填寫體重';   
    }else if(0 > Weight || Weight > 200){
        alertText.textContent = '請填寫 0 - 200 以內的數字';
    }else if(isNaN(Weight)){
        alertText.textContent = '體重請填寫數字';
    }else if(Height === "" || Height === " "){
        alertText.textContent = '您尚未填寫身高';
    }else if(0 > Height || Height > 200){
        alertText.textContent = '請填寫 0 - 200 以內的數字';
    }else if(isNaN(Height)){
        alertText.textContent = '身高請填寫數字';
    }else{
        alertText.textContent = '';
    }
}

//取得日期
function todayTime(){
    var date = new Date();
    var time = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
    return time;
}

function addList(e){
    e.preventDefault();
    let Height = inputHeight.value;
    let Weight = inputWeight.value;
    let BMI = Weight/Math.pow(Height/100,2);
    BMI = parseFloat(BMI.toFixed(2));
    let statusItem = {};
    if(Height === "" || Height === " "){    
        alertText.textContent = '欄位有誤';
        return;
    }else if(0 > Height || Height > 200){
        alertText.textContent = '欄位有誤';
        return;
    }else if(Weight === "" || Weight === " "){    
        alertText.textContent = '欄位有誤';
        return;
    }else if(0 > Weight || Weight > 200){
        alertText.textContent = '欄位有誤';
        return;
    }else if(isNaN(Height) || isNaN(Weight)){
        alertText.textContent = '欄位有誤';
        return;
    }
    if(18.5 <= BMI && BMI <24){
        statusItem.status = 'regular';
        statusItem.statusText = '理想';
    }
    else if(BMI <18.5){
        statusItem.status = 'light';
        statusItem.statusText = "體重過輕";
    }
    else if(24 <= BMI && BMI <27){
        statusItem.status = 'fat';
        statusItem.statusText = "體重過重";
    }
    else if(27 <= BMI && BMI < 30){
        statusItem.status = 'XL';
        statusItem.statusText = "輕度肥胖";
    }
    else if(30 <= BMI && BMI < 35){
        statusItem.status = 'XLL';
        statusItem.statusText = "中度肥胖";
    }
    else {
        statusItem.status = 'XLLL';
        statusItem.statusText = "=重度肥胖";
    }
    statusItem.bmi = BMI;
    statusItem.weight = Weight;
    statusItem.height = Height;
    statusItem.data = todayTime();
    statusList.push(statusItem);
    localStorage.setItem('statusList',JSON.stringify(statusList));
    //更新 LlistTable
    refreshListTable();
    let status = document.querySelector('.status');
    document.querySelector('.status h3').textContent = statusItem.bmi;
    document.querySelector('.statusText').textContent = statusItem.statusText;
    submitBtn.style.display = 'none';
    status.style.display = 'flex';
    refreshBtn.setAttribute('class',"refreshBtn " + `weight-${statusItem.status}-bg`);
    status.setAttribute('class', "status " + `weight-${statusItem.status}-color`);
    refreshClearBtn();
}
function resetInput(e){
    e.preventDefault();
    let status = document.querySelector('.status');
    status.style.display = "none";
    submitBtn.style.display = 'block';
    inputHeight.value ='';
    inputWeight.value ='';
}
function deleListItem(e){
     //刪除有誤
     e.preventDefault();
     if(e.target.parentElement.className == 'listDelete'){
         let dataNum = e.target.dataset.num;
         statusList.splice(dataNum, 1);
         localStorage.setItem('statusList', JSON.stringify(statusList));
         refreshListTable();
         refreshClearBtn();
     }
}
function clearAllItem(e){
    e.preventDefault();
    localStorage.removeItem('statusItem');
    refreshListTable();
    this.style.display = 'none';
}
function refreshClearBtn(e){
    let statusList = JSON.parse(localStorage.getItem('statusList')) || [] ;
    if(statusList.length != 0){
        clearAll.style.display = 'block';
    }else{
        clearAll.style.display = 'none';
    }
}

refreshListTable();
refreshClearBtn();
inputHeight.addEventListener('blur',heightCheck,false);
inputWeight.addEventListener('blur',weightCheck,false);
submitBtn.addEventListener('click',addList,false);
refreshBtn.addEventListener('click',resetInput,false);
listtable.addEventListener('click',deleListItem,true);
clearAll.addEventListener('click',clearAllItem,false);