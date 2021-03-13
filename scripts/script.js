document.addEventListener('DOMContentLoaded', ()=>{
 'use strict';


  const getData = (url, callback)=>{
    //XMLHttpRequest
    // const request = new XMLHttpRequest();
    // request.open('GET',url);
    // request.send();

    // request.addEventListener('readystatechange', ()=>{
    //   if(request.readyState !== 4) return;
    //   if(request.status === 200){
    //     let responce = JSON.parse(request.response);
    //     callback(responce);
    //     } else{
    //       console.error(new Error('Ошибка: ' + request.status));
    //     }

    // });

    //fetch
    fetch(url)
      .then((responce)=>{ 
        if(responce.ok) {
         return responce.json();
        } 
        throw new Error('Ошибка: ' + request.status)
      })
      .then(callback)
      .catch((err)=>{
        console.log(err)
      });




    

  };

 

 const tabs = () =>{
    const cardDetailChangeElems= document.querySelectorAll('.card-detail__change');
    const cardDetailTitleElem = document.querySelector('.card-details__title');
    const cardImageItemElem = document.querySelector('.card__image_item');
    const cardDetailsPriceElem = document.querySelector('.card-details__price');
    const descriptionMemory = document.querySelector('.description__memory');
    

    const data = [
      {
        name:'Смартфон Apple iPhone 12 Pro 128GB Graphite',
        img: 'img/iPhone-graphite.png',
        price: 25900,
        memoryRom: 128
      },
      {
        name:'Смартфон Apple iPhone 12 Pro 256GB Silver',
        img: 'img/iPhone-silver.png',
        price: 27200,
        memoryRom: 256
      },
      {
        name:'Смартфон Apple iPhone 12 Pro 64GB Pacific Blue',
        img: 'img/iPhone-blue.png',
        price: 29990,
        memoryRom: 64
      }
    ];


    const deactive = ()=>{
      cardDetailChangeElems.forEach( btn => btn.classList.remove('active'));

    }

    cardDetailChangeElems.forEach((btn, i)=>{
      btn.addEventListener('click', ()=>{
        if(!btn.classList.contains('active')){
          deactive();
          btn.classList.add('active');

          cardDetailTitleElem.textContent = data[i].name;
          cardImageItemElem.src = data[i].img;
          cardImageItemElem.alt = data[i].name;
          cardDetailsPriceElem.textContent = data[i].price + ' UAH';
          descriptionMemory.textContent = `Встроенная память (ROM) ${data[i].memoryRom} GB `;

        }
      });
    })
 }; 

 //аккордион
 const accordion = ()=>{
   const characteristicsTitle = document.querySelectorAll('.characteristics__title');
   const characteristicsDescription = document.querySelectorAll('.characteristics__description');

   /*
   characteristicsTitle.forEach((elem,i)=>{
     elem.addEventListener('click',()=>{
       elem.classList.toggle('active');
       characteristicsDescription[i].classList.toggle('active');
     })

   });*/

  const characteristicsListElem = document.querySelector('.characteristics__list');
  const characteristicsItemElems = document.querySelectorAll('.characteristics__item');


    const open =(button, dropDown)=>{
      closeAllDrops();
      dropDown.style.height = `${dropDown.scrollHeight}px`;
      button.classList.add('active');
      dropDown.classList.add('active');

    };

    const close =(button, dropDown)=>{
      button.classList.remove('active');
      dropDown.classList.remove('active');
      dropDown.style.height = '';
    };

    const closeAllDrops = (button, dropDown)=>{
      characteristicsItemElems.forEach((elem)=>{
        if(elem.children[0] !== button && elem.children[1] !== dropDown){
          close(elem.children[0], elem.children[1]);
        }

      });

    }


      characteristicsListElem.addEventListener('click',(e)=>{
       if( e.target.classList.contains('characteristics__title')){
         const parent = e.target.closest('.characteristics__item');
         const description = parent.querySelector('.characteristics__description');
         description.classList.contains('active') ? 
          close(e.target,description) : 
            open(e.target,description);
       }
        
      });

      //Закритые при клике всторону от аккордиона
    document.body.addEventListener('click',(e)=>{
     
      if(!e.target.closest('.characteristics__list')){
        closeAllDrops();
      }

    });


 };

 // modal window

 const modal = ()=>{
   const cardDetailsButtonBuy = document.querySelector('.card-details__button_buy');
   const cardDetailsButtonDelivery = document.querySelector('.card-details__button_delivery');
   
   const modal = document.querySelector('.modal');
   const cardDetailsTitle = document.querySelector('.card-details__title');
   const modalTitle = modal.querySelector('.modal__title');
   const modalSubtitle = modal.querySelector('.modal__subtitle');
   const modalTitleSubmit = modal.querySelector('.modal__title_submit');

      const openModal = (e) => {
        modal.classList.add('open');
        document.addEventListener('keydown', escapeHandler );
        modalTitle.textContent = cardDetailsTitle.textContent;
        modalTitleSubmit.value = cardDetailsTitle.textContent;
        modalSubtitle.textContent = e.target.dataset.buttonBuy;
      };

      const closeModal = ()=>{
        modal.classList.remove('open');
        document.removeEventListener('keydown', escapeHandler);

      };

  
      let escapeHandler = e =>{
        if(e.code == 'Escape' || e.keyCode === '27'){
          closeModal();
        }
      };

        modal.addEventListener('click',(e)=>{
          if(e.target.classList.contains('modal__close') || e.target.classList.contains('open')  ){
          closeModal();
       }
      });

        cardDetailsButtonBuy.addEventListener('click', openModal );
        cardDetailsButtonDelivery.addEventListener('click',openModal);
        


      };



  const renderCrossSell = ()=>{
    const crossSellList = document.querySelector('.cross-sell__list');
    const crossSellAdd = document.querySelector('.cross-sell__add');

    let allGoods = [];


    //goods img shuffle
    let shuffle = arr => arr.sort(()=>Math.random() - 0.5);



      const createCrossSellItem = (good)=>{
      let liItem = document.createElement('li');
      liItem.innerHTML =`
            <article class="cross-sell__item">
							<img class="cross-sell__image" src="${good.photo}" alt="${good.name}">
							<h3 class="cross-sell__title">${good.name}</h3>
							<p class="cross-sell__price">${good.price} грн</p>
							<button type="button" class="button button_buy cross-sell__button">Купити</button>
						</article>
      `;
      return liItem;
    };

    const render = arr => {

      arr.forEach(item =>{
        crossSellList.append(createCrossSellItem(item));
      })

    }




    const createCrossSellList = (goods) => {
      allGoods.push(...shuffle(goods))
    
      let fourItem = allGoods.splice(0,4);
      render(fourItem);
    };

    crossSellAdd.addEventListener('click',()=>{
      render(allGoods);
      crossSellAdd.remove();
    })

    getData('cross-sell-dbase/dbase.json', createCrossSellList);
  

}
      

 tabs();
 accordion();
 modal();
 renderCrossSell();
 amenu('.header__menu','.header-menu__list','.header-menu__item','.header-menu__burger');


// end

});