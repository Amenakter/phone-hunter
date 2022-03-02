const searchField = document.getElementById('search-field')
const notFound = document.getElementById('no-result') 
const phoneContainer = document.getElementById('phones')
const detailContainer = document.getElementById('details');
const detail = document.getElementById('moreDetails')

const loadData = async () => {
    const searchText = searchField.value;
    // error handle
    if (searchText=='') {
        notFound.innerText = 'Please search valid something'
        phoneContainer.textContent = '';
        detailContainer.textContent=''
    } else {
        // data load
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
        // console.log(url);
        const res = await fetch(url);
        const data = await res.json();
        displayPhone(data.data);
        // search bar clear
        searchField.value = '';
    }  
    // clear other info
    detail.textContent = '';
}

// display data
const displayPhone =  phones => {  
    const phone20 = phones.slice(0,20)
    phoneContainer.textContent = '';
    if (phone20.length == 0) {
        // error massage
        notFound.innerText = 'No Found,Try Again'
        phoneContainer.textContent = '';
        detailContainer.textContent = ''
        
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
            // append div
            phoneContainer.appendChild(phonesDiv)
            // When searching new phone item then phone details will be hide
            detailContainer.textContent = '';     
        });
        // clear error
        notFound.innerText = '';  
    } 
} 

// load phone details
const phoneDetails = async id => {
   
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    // console.log(url);
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}

// diaplay phone details
const displayPhoneDetails = details => {
    // console.log(details);
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
    // When click the details button to show another phone details then previous phone's others info will be hide.
    detail.textContent = ''
}

// load other info
const others = async moreInfo => {
    // console.log(moreInfo);
    const url = `https://openapi.programming-hero.com/api/phone/${moreInfo}`
    // console.log(url);
    const res = await fetch(url);
    const data = await res.json();
   
    displayOtherInfo(data.data);
 
}

// display others info
const displayOtherInfo = otherInfo => {   
    // console.log(otherInfo); 
    detail.textContent = '';
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
                  <li class="list-group-item"> Sensors:${otherInfo.mainFeatures.sensors.join(" | ")}</li>
                  
                  
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
    
                 
    detail.appendChild(info)
}
