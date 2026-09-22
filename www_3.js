
const http = require('http');
const pageHead = '<!DOCTYPE html>\n<html lang="et">\n<head>\n\t<meta charset="utf-8">\n\t<title>Elenor Loitmaa, veevbiprogrammeerimine</title>\n</head>\n<body>\n';
const pageBody = '\t<h1>Elenor Loitmaa, veebiprogrammeerimine</h1>\n\t <p>See leht on loodud veebiprogrammeerimise kursusel <a href="https://www.tlu.ee">Tallinna Ülikoolis</a> ning ei sislda tأµsiseltvأµetavat sisu!</p>\n\t<p>Esialgu tutvusime lihtsalt HTML keelega, peatselt programmeerime.</p>\n\t<hr>';
const pageFoot = '\n</body>\n</html>';

http.createServer(function(req, res){
	res.writeHead(200, {"Content-type": "text/html; charset=utf-8"});
	res.write(pageHead);
	res.write(pageBody);
	res.write('<p>Täna on: ' + dateFormattedET() + '</p>');
	res.write('<p>Leht avati kell: ' + timeFormattedET() + '</p>');
	
	res.write(pageFoot);
	res.end();
	}).listen(5212);

	function dateFormattedET(){
	let timeNow = new Date();
	let dayNow = timeNow.getDay();
	let dateNow = timeNow.getDate();
	let monthNow = timeNow.getMonth();
	let yearNow = timeNow.getFullYear();
	let monthNamesET = ['jaanuar', 'veebruar', 'märts', 'aprill', 'mai', 'juuni', 'juuli', 'august', 'september', 'oktoober', 'november', 'detsember'];
	let dayNamesET = ['esmaspäev', 'teisipäev', 'kolmapäev', 'neljapäev', 'reede', 'laupäev', 'pühapäev'];
	return dayNamesET[dayNow] + ', ' + dateNow + '. ' + monthNamesET[monthNow] + ' ' + yearNow;
	}
	
const timeFormattedET = function(){	
	let timeNow = new Date();
	let hourNow = timeNow.getHours();
	let minuteNow = timeNow.getMinutes();
	let secondNow = timeNow.getSeconds();
	return hourNow + ':' + minuteNow + ':' + secondNow;
}
