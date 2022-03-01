const loadData =async () => {
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value;
    
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    // console.log(url);
    const res = await fetch(url);
    const data = await res.json();
    displayPhone(data.data);
    searchField.value = '';
}

// display data
const displayPhone =  phones => {
     
    const phone20 = phones.slice(0,20)
    const phoneContainer = document.getElementById('phones')
    phoneContainer.textContent = '';

    phone20.forEach(phone => {
            // console.log(phones.slice(0,20))
            const phonesDiv = document.createElement('div');
            phonesDiv.classList.add('col');
            phonesDiv.innerHTML = `<div class="card h-100">
                 <img src="${phone.image}" class="card-img-top w-50 align-self-center mt-5" >
                  <div class="card-body">
                  <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">Brand:${phone.brand}</p>
                    </div>
                    <div class="card-footer">
                   <button onclick="phoneDetails('${phone.slug}')" class="btn btn-success w-100">Details</button>
                 </div>
               </div>`
        
        
            phoneContainer.appendChild(phonesDiv)
     });
        
       
        
} 

const phoneDetails = async id => {
    // console.log(id);
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    console.log(url);
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = details => {
    console.log(details);
    const detailContainer = document.getElementById('details');
    detailContainer.textContent=''
    const card = document.createElement('div')
    card.classList.add('card');
    
    card.innerHTML = `
                      
                       
                <img src="${details.image}"  class="img card-img-top w-25 align-self-center mt-5">
                <div class="card-body">
                  <h5 class="card-title">${details.name}</h5>
                  <h5 class="card-title">${details.releaseDate? details.releaseDate:'Release Date is Not Found'}</h5>
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
