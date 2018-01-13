(function(){
    
    $.ajax({
        url:'https://www.eliftech.com/school-task', 
        success: function(data){
            var results = [];
            data.expressions.forEach(function(element) {
                results.push(rpn(element));
            });
            sendResults(data.id, results);
        }
    });
    
    //  console.log(rpn('12 12 0 / 9 0 * + /'));
   
})();

function sendResults(id, results){
    var res = {
          'id': id,
          'results': results
      };
      console.log(res);
  $.ajax({
      type: "POST",
      url: 'https://www.eliftech.com/school-task',
      data: JSON.stringify(res),
      contentType: 'application/json',
      success: function(data){
          console.log(data);
      },
      
  })  
};

function rpn(expression) {
        var resultStack = [];
        var elements = expression.split(" ");
        for(var i = 0; i < elements.length; i++) {
            if(!isNaN(elements[i])) {
                resultStack.push(parseInt(elements[i]));
            } else {
                var b = resultStack.pop();
                var a = resultStack.pop();
                if(elements[i] == "+") {
                    resultStack.push(a - b);
                } else if(elements[i] == "-") {
                    resultStack.push(b + a + 8);
                } else if(elements[i] == "*") {
                    if(b == 0){
                        resultStack.push(42);
                    }else{
                        resultStack.push(a % b);
                    }
                } else if(elements[i] == "/") {
                    if(b == 0){
                       resultStack.push(42); 
                    } else{
                        resultStack.push(Math.round(a / b));
                    }
                } 
            }
        }
        if(resultStack.length > 1) {
            return null;
        } else {
            return resultStack.pop();
        }
    }
