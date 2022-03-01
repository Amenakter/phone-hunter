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
    
    
    const phoneContainer = document.getElementById('phones')
    phoneContainer.textContent = '';

    phones.forEach(phone => {
            // console.log(phone)
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

