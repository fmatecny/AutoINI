
var file;
$(function () {
    if (window.FileReader) {
        $('#file1').on('change', function (e) {
            file = e.target.files[0];
            var reader = new FileReader();
            reader.onload = function (e) {
                var csv = reader.result.split('\n');
                highlight(csv);
            }
            reader.readAsText(file);
        });
    } else {
        console.log("no support");
    }
});

function highlight(csv){
    var headArr = [];
    var i,j;
    var regexpComent = new RegExp(";");
    var regexpHead = new RegExp("[\[][^;]*]");
    var match = [];
    var foo = 1;
    var idx =  -1;
    j = 0;
    for (i = 0; i < csv.length; i++)
    {
          idx = -1;
          foo = 1;
          if ((match = regexpComent.exec(csv[i])) != null)
           {
              csv[i] = csv[i].substring(0,match.index) + "<span style='color:green;'>" + csv[i].substring(match.index,csv[i].length-1) + "</span>";
              foo = 0;
              idx = match.index;
           }
         if ( ((match = regexpHead.exec(csv[i])) != null) && ((match.index < idx) || idx == -1) )
         {  
            headArr[j] = csv[i].substring(match.index,match.index+match[0].length);  
            csv[i] = csv[i].substring(0,match.index) + "<span style='font-weight:900;' id='" + j + "'>" +  headArr[j] + "</span>" + csv[i].substring(match.index+match[0].length,csv[i].length-foo);
            headArr[j] = "<a href='#" + j + "'>" +  headArr[j] + "</a>";
            j++;
         } 
    }
    $("#editor").html(csv.join('\n'));
    $("#tree").html(headArr.join('\n')).css("font-weight", "900");
    console.log(headArr);
}


function save(){
    console.log($("#editor").text());
    console.log(file.name);
    var fso, s;
    fso = new ActiveXObject("Scripting.FileSystemObject");
    s = fso.OpenTextFile("ietm_data.txt" , 8, 1, -2);
    s.writeline($("#editor").text());
    s.Close();

}