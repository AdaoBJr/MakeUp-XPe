import { useMakeupApi, loadingAnimation } from '../../services';

const { getProducts } = useMakeupApi();

loadingAnimation({ isFetching: true, querySelector: '#loading' });

const resProducts = await getProducts();
if (resProducts.data.length > 0)
  loadingAnimation({ isFetching: false, querySelector: '#loading' });

const products = document.querySelector('#products')!;
resProducts.data.splice(50, 63).forEach((item) => {
  products.innerHTML += `
  <div
    id="product"
    class="w-[250px] h-full shadow-1 rounded-1 flex flex-col justify-center items-center gap-y-5 px-5 py-8 cursor-pointer hover:shadow-0 duration-500"
  >
    <img
      class="w-full"
      src=${item.image_link}
      onerror=this.src="./src/assets/images/default-image.png"
    />
    <h2 class="text-lg font-bold text-center text-text-primary">
      ${item.name ?? ''}
    </h2>
    <div id="brand-price" class="flex justify-center items-center gap-x-2 w-full">
      <p class="shadow-1 px-2 py-1 rounded-md text-text-secondary font-semibold">
      ${item.brand ?? ''}
      </p>
      <p
        class="px-2 py-1 rounded-md shadow-1 bg-primary-main text-common-white font-semibold"
      >
      R$ ${
        Number(item.price).toLocaleString('pt-br', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }) ?? 0
      }
      </p>
    </div>
  </div>
  `;
});
