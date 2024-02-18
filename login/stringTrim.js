

//Trim and re-trim only when necessary (prevent re-trim when string is shorted than maxLength, it causes last word cut) 
const Trimmer = (toTrim) => {
    for(var index = 0;index<toTrim.length;index++){
        var yourString = toTrim[index]; //replace with your string.
        //console.log("ys"+yourString);
     
     var trimmedString = "";
     if(yourString.length > trimmedString.length){
        //trim the string to the maximum length
        var reqString = "";
        var reqString = yourString.substr(0 , 11);
        //console.log("rq"+reqString);
        var availString = 'auth-token=';
        var alsoString = ' auth-token';
        //console.log("rq"+availString);
        //console.log("cmp "+reqString.localeCompare(availString));
        var me = new String(reqString.trim());
        var you = new String(availString.trim());
        var we = new String(alsoString.trim());
        var isEquel = JSON.stringify(me) === JSON.stringify(you);
        var alsoEquel = JSON.stringify(me) === JSON.stringify(we);
        var i = isEquel ? 1 : 0;
        var j = alsoEquel ? 1 : 0;
        //console.log(i);
        //console.log(j);
            if(i) {
                var maxLength = 11; // maximum number of characters to extract
            }
            else{
                var maxLength = 12; // maximum number of characters to extract
            }

            if(i || j){
                var trimmedString = yourString.substr(maxLength , yourString.length);
               // console.log("tS " + trimmedString);
                return trimmedString;
            }
        
        
        
        //re-trim if we are in the middle of a word and 
       // trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))
     }
    }
    
};

module.exports = Trimmer;