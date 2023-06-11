
let endOfPage = 0; 
let preloading = false;         //eliminacja wielokrotnego ładowania danych 

const showPreloader = () => {
    let preloader = document.getElementById('preloader');
    preloader.style.display = 'block';
    preloading = true;
}

const hidePreloader = () => {
    let preloader = document.getElementById('preloader');
    preloader.style.display = 'none';
    preloading = false;
}

const getData = () => {
    
    if (!preloading) {
        showPreloader();
        
        fetch('https://akademia108.pl/api/ajax/get-users.php')
            .then(res => res.json())
            .then(data => {

                let body = document.body;
                let hr = document.createElement('hr');
                body.appendChild(hr);

                for (let user of data) {
                    let pId = document.createElement('p');
                    let pName = document.createElement('p');
                    let pWeb = document.createElement('p');
                    
                    pId.innerText = `User ID: ${user.id}`;
                    pName.innerText = `User name: ${user.name}`;
                    pWeb.innerHTML = `User url: ${user.website}<br />-----------`;
                    
                    body.appendChild(pId);
                    body.appendChild(pName);
                    body.appendChild(pWeb);
                }

                hidePreloader();
                console.log(data);
            })
            .catch(error => {
                console.error(error);
            });        
    }
}


const scrollToEndOfPage = () => {
    let docEl = document.documentElement;
    
    let scrollHeight = docEl.scrollHeight;
    let scrollTop = docEl.scrollTop;
    let clientHeight = docEl.clientHeight;

    let sumScroll = Math.ceil(scrollTop +  clientHeight);

    console.log(`scrollFull: ${sumScroll}`)
    console.log(`scrollHeight: ${scrollHeight}`)
    console.log(`scrollTop: ${scrollTop}`)
    console.log(`clientHeight: ${clientHeight}`)
    console.log(`===========================`)

    if (sumScroll >= scrollHeight) {
        endOfPage +=1;
        console.log(`koniec strony po raz:  ${endOfPage}` );
        getData();
    }
}   

window.addEventListener('scroll', scrollToEndOfPage)