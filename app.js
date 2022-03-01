const loadData = async () => {
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value;
  
    const notFound = document.getElementById('no-result') 
    // error handle
    if (searchText=='') {
        notFound.innerText = 'Please search valid something'

    } else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
        // console.log(url);
        const res = await fetch(url);
        const data = await res.json();
        displayPhone(data.data);
    
        // search bar clear
        searchField.value = '';
    }  
}

// display data
const displayPhone =  phones => {  
    const phone20 = phones.slice(0,20)
    const phoneContainer = document.getElementById('phones')
    phoneContainer.textContent = '';
    const notFound = document.getElementById('no-result')
    if (phone20.length == 0) {
        notFound.innerText = 'No Found,Try Again'
    }
    else {
        phone20.forEach(phone => {
            // console.log(phones.slice(0,20))
            const phonesDiv = document.createElement('div');
            phonesDiv.classList.add('col');
            phonesDiv.innerHTML = `<div class="card h-100">
                 <img src="${phone.image}" class="card-img-top w-50 align-self-center mt-5" >
                  <div class="card-body">
                  <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">Brand : ${phone.brand}</p>
                    </div>
                    <div class="card-footer">
                    <a href="#"> <button  onclick="phoneDetails('${phone.slug}')" class="btn btn-success w-100">Details</button></a>
                 </div>
               </div>` 
            phoneContainer.appendChild(phonesDiv)
        });
        // clear error
        notFound.innerText = '';
        
    } 
} 

// load phone details
const phoneDetails = async id => {
    // console.log(id);
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    console.log(url);
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}

// diaplay phone details
const displayPhoneDetails = details => {
    // console.log(details);
    const detailContainer = document.getElementById('details');
    detailContainer.textContent=''
    const card = document.createElement('div')
    card.classList.add('card');  
    card.innerHTML = `        
                <img src="${details.image}"  class="img card-img-top w-25 align-self-center mt-5">
                <div class="card-body">
                  <h5 class="card-title">${details.name}</h5>
                  <h6 class="card-title">${details.releaseDate? details.releaseDate:'Release Date  Not Found'}</h6>
                 </div>
                 <h6>Main Features:</h6>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">Storage : ${details.mainFeatures.storage}</li>
                  <li class="list-group-item">ChipSet : ${details.mainFeatures.chipSet}</li>
                  <li class="list-group-item">displaySize : ${details.mainFeatures.displaySize}</li>
                  <li class="list-group-item">Memory : ${details.mainFeatures.memory}</li>
                </ul>
                <div class="card-body">
                <a onclick="others('${details.slug}')" class="btn btn-primary">Others info</a>
                </div> 
                     `
    detailContainer.appendChild(card)
}

// load other info
const others = async moreInfo => {
    // console.log(moreInfo);
    const url = `https://openapi.programming-hero.com/api/phone/${moreInfo}`
    console.log(url);
    const res = await fetch(url);
    const data = await res.json();
    displayOtherInfo(data.data);
}

// display others info
const displayOtherInfo = otherInfo => {   
    const details = document.getElementById('moreDetails') 
    details.textContent = '';
    const info = document.createElement('div')
    info.classList.add('card')
    if (otherInfo?.others) {
        info.innerHTML = `
                 <div class="card-header"><h5>Others Info</h5></div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">NFC : ${otherInfo.others.NFC}</li>
                  <li class="list-group-item">WLAN: ${otherInfo.others.WLAN}</li>
                  <li class="list-group-item">Radio: ${otherInfo.others.Radio}</li>
                  <li class="list-group-item"> GPS: ${otherInfo.others.GPS}</li>
                  <li class="list-group-item">USB: ${otherInfo.others.USB}</li>
                  <li class="list-group-item">Bluetooth :${ otherInfo.others.Bluetooth }</li>
                  <div class="card-header"><h5>Sensors:</h5> </div>
                  <li class="list-group-item"> ${otherInfo.mainFeatures.sensors[0]}</li>
                  <li class="list-group-item">${otherInfo.mainFeatures.sensors[1]}</li>
                  <li class="list-group-item"> ${otherInfo.mainFeatures.sensors[2]}</li>
                  <li class="list-group-item"> ${otherInfo.mainFeatures.sensors[3]}</li>
                  <li class="list-group-item"> ${otherInfo.mainFeatures.sensors[4]}</li>
                  <li class="list-group-item"> ${otherInfo.mainFeatures.sensors[5]}</li>
                  
                </ul>
                
                 `
    } else {
        info.innerHTML = `
                 <div class="card-header"> <h5>sensor:</h5></div>
                  <ul class="list-group list-group-flush">
                  <li class="list-group-item"> ${otherInfo.mainFeatures.sensors[0]}</li>
                  <li class="list-group-item">${otherInfo.mainFeatures.sensors[1]}</li>
                  <li class="list-group-item"> ${otherInfo.mainFeatures.sensors[2]}</li>
                  <li class="list-group-item"> ${otherInfo.mainFeatures.sensors[3]}</li>
                  <li class="list-group-item"> ${otherInfo.mainFeatures.sensors[4]}</li>
                  <li class="list-group-item"> ${otherInfo.mainFeatures.sensors[5]}</li>
                  
                </ul>`
    }
    
                 
    details.appendChild(info)
}

