import { getFromLocalStorage, PROD_KEY } from '../../services';
import { GetProducts } from '../../types';

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get('id');

const productsFromLS = getFromLocalStorage<GetProducts[]>(PROD_KEY);
const details = productsFromLS.find((product) => product.id === Number(productId))!;

const productDetail = document.querySelector('#product-details')!;

productDetail.innerHTML = `
      <div
        id="product-${details.id}"
        class="w-[500px] max-h-[800px] shadow-1 rounded-1 flex flex-col justify-center items-center gap-y-5 px-5 py-8 hover:shadow-0 duration-500"
        >
        <img
          id="product-${details.id}"
          class="w-full max-h-[500px]"
          src=${details.image_link}
          onerror=this.src="./src/assets/images/default-image.png"
        />
        <h2 class="text-lg font-bold text-center text-text-primary" id="product-${
          details.id
        }">
          ${details.name ?? ''}
        </h2>
        <div id="product-${
          details.id
        }" class="grid gap-x-2 grid-cols-2 items-center justify-center" >
          <p class="shadow-1 px-2 py-2 rounded-md text-text-secondary font-semibold text-center" id="product-${
            details.id
          }">
          ${details.brand ?? ''}
          </p>
          <p
            id="product-${details.id}"
            class="px-3 py-2 rounded-md shadow-0 bg-primary-main text-common-white font-semibold"
          >
          R$ ${
            Number(details.price).toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }) ?? 0
          }
          </p>
        </div>
        <div class="grid gap-y-1 shadow-1 px-2 py-3 rounded-md">
            <div class="grid gap-y-7 grid-cols-2 items-center justify-center" >
              <p class="text-text-secondary">
                Rating
              </p>
              <p class="text-text-primary bg-grey-200 p-2 rounded text-center">
                ${details.rating ?? 0}
              </p>
            </div>
            <div class="grid gap-y-7 grid-cols-2 items-center justify-center">
              <p class="text-text-secondary">
                Category
              </p>
              <p class="text-text-primary bg-grey-200 p-2 rounded text-center">
              ${details.category ?? '-'}
              </p>
            </div>
            <div class="grid gap-y-7 grid-cols-2 items-center justify-center">
              <p class="text-text-secondary">
                Type
              </p>
              <p class="text-text-primary bg-grey-200 p-2 rounded text-center">
              ${details.product_type ?? ''}
              </p>
            </div>
          </div>
      </div>
      `;
