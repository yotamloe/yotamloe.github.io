
document.getElementById("select").addEventListener("change",addModule);
var select 
var module
var value
var count
var dict = {};
function  addModule(){
     select = document.getElementById("select");
     module = select.value;
     console.log(module)
     createModule(module)


}

function createModule(module) {
    var para = document.createElement('p');
    var dlt = document.createElement('button')
    dlt.className += "btn btn-primary remove"
    dlt.innerHTML ="x"
    dlt.addEventListener('click',removeModule)
    para.className += "heading"
    var container = document.createElement('div');
    container.appendChild(dlt)
    container.appendChild(para)
    container.id = module
    container.className+= "module_container"
    para.innerHTML = module
    $("#insert").prepend(container)
    var metricsets = []
    for (var key of Object.keys(data)) {
        if (key == module){
            for (value of Object.keys(data[key])){
            console.log(value);
            console.log(data[key][value].metric_count)
            metricsets.push(value);
            count = data[key][value].metric_count
            check = document.createElement('input')
            lable = document.createElement('lable')
            row = document.createElement('div')
            lable2 = document.createElement('label')
            msum = document.createElement('p')
            num_of_metrics = document.createElement('lable')
            // checkall = document.createElement('input')
            input = document.createElement('input')
            br = document.createElement('br')

            num_of_metrics.innerHTML =    "(" +count+ " Metrics)"
            check.type ='checkbox'
            // checkall.type='checkbox'
            // check.id = value
            lable.innerHTML = value
            lable2.innerHTML = "Sources:"
            input.type = 'Text'
            input.id = value
            // input.value = 0
            msum.innerHTML = "Sum: " // + sum var
            // add lable for 
            // add num of metrics         
            // container.appendChild(check)

            // add classes
            lable.className += "metricset_name "
            input.className += "w3-input input float-md-right"
            num_of_metrics.className+= "metrics_count"
            row.className += "row "
            lable2.className+= "sources"



            container.appendChild(row)
            row.appendChild(lable)
            row.appendChild(num_of_metrics)
            // number of metrics
            row.appendChild(lable2)
            row.appendChild(input)
            container.appendChild(br)

            input.addEventListener('change',addSources)
            dict[value] = input.value
            
    
            //
            }
        }
        // add select all
      }
    console.log(metricsets)
    console.log(dict)
    




    // container.appendChild(checkall)
    // container.appendChild(msum)
}

document.getElementById("body").addEventListener("change", calculateMetrics)



function calculateMetrics(){
    var sum = 0 ;
    for (var prop in dict) {
        var val = dict[prop]
        for (var keys of Object.keys(data)){

            if(typeof data[keys][prop] !== "undefined"){
                metriccount = data[keys][prop].metric_count
                sum = sum + (val * metriccount)
            } 
            
        }
    }
    document.getElementById("sum").innerHTML = sum
    if (sum > 1000)
    document.getElementById("price").innerHTML = Math.floor(((sum/1000)*25)) + " $"
    else
    document.getElementById("price").innerHTML = 0 +" $"



}

function addSources() {
    dict[this.id] = this.value
}

function removeModule(){
    var elments =this.parentElement.children
    
    var array_of_elements = Array.from(elments);
    
    console.log(array_of_elements)
    for (i of array_of_elements){
        console.log(i)
    if (i.classList.contains('row')){
        for (j of i.children){
            if(j.classList.contains('metricset_name')){
                var setname = j.innerHTML
                console.log(setname)
                delete dict[setname]
            }
            
        }

    }

    }
    
    this.parentElement.remove()
    calculateMetrics()

}




