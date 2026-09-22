
const http = require('http');
//moodul URL-i parsimiseks
const url = require('url');
//moodul failiteede (pathide) haldamiseks
const path = require('path');
//const fs = require('fs');
const fs = require('fs').promises;
const pageHead = '<!DOCTYPE html>\n<html lang="et">\n<head>\n\t<meta charset="utf-8">\n\t<title>Elenor Loitmaa, veevbiprogrammeerimine</title>\n</head>\n<body>\n';
const pageBanner = '<img src="veebiprogrammeerimine_2026_ID.png" alt="">\n';
const pageBody = '\t<h1>Elenor Loitmaa, veebiprogrammeerimine</h1>\n\t <p>See leht on loodud veebiprogrammeerimise kursusel <a href="https://www.tlu.ee">Tallinna Ülikoolis</a> ning ei sislda tأµsiseltvأµetavat sisu!</p>\n\t<p>Esialgu tutvusime lihtsalt HTML keelega, peatselt programmeerime.</p>\n\t<hr>';
const pageFoot = '\n</body>\n</html>';

http.createServer(async function(req, res){
	//vaatan URL-i
	console.log('Päring: ' + req.url);
	//parsin url-i 
	let currentURL = url.parse(req.url, true);
	console.log('Parsituna: ' + currentURL.pathname);
	
	if(currentURL.pathname === '/'){
		res.writeHead(200, {"Content-type": "text/html; charset=utf-8"});
		res.write(pageHead);
		res.write(pageBanner);
		res.write(pageBody);
		res.write('<p>Täna on: ' + dateFormattedET() + '</p>');
		res.write('<p>Leht avati kell: ' + timeFormattedET() + '</p>');
		
		res.write(pageFoot);
		return res.end();
	}
	
	else if (currentURL.pathname === '/vanasona'){
		res.writeHead(200, {"Content-type": "text/html; charset=utf-8"});
		res.write(pageHead);
		res.write('\t<h1>Tänane Eesti vanasõna<h1>\n\t<p>Siin näed tänaseks päevaks loositud vanasõna.<p>\n\t<hr>');
		res.write(pageFoot);
		return res.end();
	}
	
		else if (currentURL.pathname === '/veebiprogrammeerimine_2026_ID.png'){
		//liidame kättesaamatu päris kataloogi jms virtuaalseks failiteeks
		let bannerPath = path.join(__dirname, 'pic', currentURL.pathname);
		try { 
			const data = await fs.readFile(bannerPath);
			res.writeHead(200, {"Content-type": "image/png"});
			res.end(data);
		} catch (err) {
			res.writeHead(404, {"Content-type": "text/plain; charset=utf8"});
			return res.end('Pilti ei leitud!');
		}
		

	}
	
	/* else if (currentURL.pathname === '/veebiprogrammeerimine_2026_ID.png'){
		//liidame kättesaamatu päris kataloogi jms virtuaalseks failiteeks
		let bannerPath = path.join(__dirname, 'pic', currentURL.pathname);
		fs.readFile(bannerPath, (err, data)=>{
			if(err){
				throw(err);
			} else {
				res.writeHead(200, {"Content-type": "image/png"});
				return res.end(data);
			}
		});
	} */
		
	else {
		return res.end('Viga 404! Ei leia sellist lehte!');
	}

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
