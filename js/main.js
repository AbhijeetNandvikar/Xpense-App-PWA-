const form = document.querySelectorAll('.input-container div input') ;
const addBtn = document.querySelector('#add') ;
const expense = document.querySelector('#expense-container') ;
const total = document.querySelector('#total') ;
total.innerHTML = `0 ₹`
var me = {};
let maxcount = 0 ;


auth.onAuthStateChanged(user => {
    // Returns the user id
    console.log(user.Sb.uid)
})

console.log(me)



//Calculate Total Expense 
const totalAmount = () => {
    var expData = document.querySelectorAll('#val') ;
    let finalAmount = 0 ;

    expData.forEach(item => {

    let val = item.innerHTML.toString() ;
    val = parseInt(val.substring(0,val.length-1));
    finalAmount += val ;
        
    })

    console.log(finalAmount) ;
    total.innerHTML = `${finalAmount} ₹`


}

// To render the expense List
const render = (doc) => {
    maxcount = doc.length ;
    let expenseList = `` ;
    let html = '' ;

        doc.forEach( exp => {
                console.log(exp.data())
                let data = exp.data()
                let item1 = data.item ;
                let val = data.value ; 
                // To get  date and time of expense   
                const date = new Date() ;
                var day=date.getDate();  
                var month=date.getMonth()+1;  
                var year=date.getFullYear();  
                var today=new Date();  
                var h=today.getHours();  
                var m=today.getMinutes();  
                var s=today.getSeconds();  

                    html = `
                        <div id="data">
                        <div> 
                            <span>${item1}</span>
                            <span id='val' >${val + '₹'}</span>
                            <br>
                            <br>
                        </div>
                        <div>
                            <span>${day+'/'+month+'/'+year+' '+h+':'+m+':'+s}</span>
                            <span><button ><i id='${data.time}' class="material-icons">delete_outline</i></button></span>
                            <br>
                        </div>
                    </div>

                    ` ;
                    expenseList += html;
                    expense.innerHTML = expenseList ;

                    totalAmount() ;

            
            
    
    }) 

    
    console.log(maxcount) ;


}

addBtn.addEventListener('click', (event) => {
    event.preventDefault() ;
    console.log(form[0].value,form[1].value) ;
    if(form[0].value == '' || form[1].value == ''){
        return 
    }else{

        auth.onAuthStateChanged(user => {
            let d = new Date()
            d = d.getTime() ;
            db.collection(user.uid).doc(`${d}`).set({
                item : form[0].value ,
                value : form[1].value ,
                time : d 

            }).then(() =>{
                form[0].value = null ;
                form[1].value = null ; 

                

            }
                
            )

        })


    }

    totalAmount() ;

    
}) ;


expense.addEventListener('click', (event) => {
    let num = event.srcElement.id
    var expList = document.querySelectorAll('#data div span button i') ;
    console.log(expList)

    


    for(let i = 0 ; i<maxcount; i++){
        if(num==expList[i].id){
            console.log(num) ;
            console.log(expList[i].id)

            console.log('matched'+i)

            auth.onAuthStateChanged(user => {
                db.collection(user.uid).doc(`${num}`).delete().then(function() {
                    console.log("Document successfully deleted!");
                    if(maxcount==0){
                        expense.innerHTML = `` ;
                        document.location.reload()
                    }
                }).catch(function(error) {
                    console.error("Error removing document: ", error);
                });
            })
            

        }
    }
    totalAmount() ;



})

// Connecting to database
auth.onAuthStateChanged(user => {
    db.collection(user.uid).onSnapshot(snapshot => {
        render(snapshot.docs)
        // let mydoc = snapshot.docs ;
        // mydoc.forEach( docum => {
        //     console.log(docum.id)
    
        // })
    })
})


