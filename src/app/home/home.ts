import {
  PROD_KEY,
  useMakeupApi,
  loadingAnimation,
  saveInLocalStorage,
} from '../../services';

const { getProducts, getProductsByFilter } = useMakeupApi();

(async () => {
  //Iniciando com Loading
  loadingAnimation({ isFetching: true, querySelector: '#loading' });

  //Fazendo requisição a api
  const resProducts = await getProducts();
  let productsToRender = [...resProducts];
  saveInLocalStorage(PROD_KEY, productsToRender);

  //Removendo loading com o retorno da api
  if (productsToRender.length > 0)
    loadingAnimation({ isFetching: false, querySelector: '#loading' });

  //Filtros
  const inputName = document.querySelector<HTMLInputElement>('#name')!;
  const selectBrand = document.querySelector<HTMLSelectElement>('#brand')!;
  const selectType = document.querySelector<HTMLSelectElement>('#type')!;
  const selectOrder = document.querySelector<HTMLSelectElement>('#order')!;

  inputName.addEventListener('change', async () => {
    filterByName();
    renderProducts();
  });

  selectBrand.addEventListener('change', async () => {
    await filterProducts();
    renderProducts();
  });

  selectType.addEventListener('change', async () => {
    await filterProducts();
    renderProducts();
  });

  selectOrder.addEventListener('change', async () => {
    filterBySort();
    renderProducts();
  });

  async function filterProducts() {
    loadingAnimation({ isFetching: true, querySelector: '#loading' });
    const brandFilter = selectBrand.value || null;
    const typeFilter = selectType.value || null;
    const resProducts = await getProductsByFilter({ brandFilter, typeFilter });
    productsToRender = [...resProducts];
    loadingAnimation({ isFetching: false, querySelector: '#loading' });
  }

  function filterBySort() {
    const valueSelectOrder = selectOrder.value;

    if (valueSelectOrder === 'rating')
      productsToRender = productsToRender.sort((a, b) => b.rating! - a.rating!);
    if (valueSelectOrder === 'menores-precos')
      productsToRender = productsToRender.sort(
        (a, b) => Number(a.price)! - Number(b.price)!
      );
    if (valueSelectOrder === 'maiores-precos')
      productsToRender = productsToRender.sort(
        (a, b) => Number(b.price)! - Number(a.price)!
      );
    if (valueSelectOrder === 'nome')
      productsToRender = productsToRender.sort((a, b) => a.name!.localeCompare(b.name!));
    if (valueSelectOrder === 'nome-desc')
      productsToRender = productsToRender.sort((a, b) => {
        if (a.name! < b.name!) {
          return 1;
        }
        if (a.name! > b.name!) {
          return -1;
        }
        return 0;
      });
  }

  function filterByName() {
    const valueInputName = inputName.value.trim().toLowerCase();

    if (valueInputName) {
      productsToRender = productsToRender
        // .slice(60, 150)
        .filter((item) => item.name?.trim().toLowerCase().startsWith(valueInputName));
    } else {
      productsToRender = [...resProducts];
    }
  }

  //Renderizando retorno da api na tela
  function renderProducts() {
    const products = document.querySelector('#products')!;
    products.innerHTML = '';

    const avoidSlow = false; // ative para diminuir o tamanho do json e diminuir a lentidão resultante da falta de paginação

    const productsSlicedToAvoidSlow = avoidSlow
      ? productsToRender.slice(60, 150)
      : productsToRender;

    productsSlicedToAvoidSlow.map((item) => {
      products.innerHTML += `
      <a id="product-${item.id}" href="details.html?id=${item.id}" >
        <div
          id="product-${item.id}"
          class="w-[250px] h-full shadow-1 rounded-1 flex flex-col justify-center items-center gap-y-5 px-5 py-8 cursor-pointer hover:shadow-0 duration-500"
          >
          <img
            id="product-${item.id}"
            class="w-full"
            src=${item.image_link}
            onerror=this.src="./src/assets/images/default-image.png"
          />
          <h2 class="text-lg font-bold text-center text-text-primary" id="product-${
            item.id
          }">
            ${item.name ?? ''}
          </h2>
          <div id="product-${
            item.id
          }" class="flex justify-center items-center gap-x-2 w-full" >
            <p class="shadow-1 px-2 py-1 rounded-md text-text-secondary font-semibold" id="product-${
              item.id
            }">
            ${item.brand ?? ''}
            </p>
            <p
              id="product-${item.id}"
              class="px-2 py-1 rounded-md shadow-1 bg-primary-main text-common-white font-semibold"
            >
            R$ ${
              Number(item.price).toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }) ?? 0
            }
            </p>
          </div>
        </div>
      </a>
        `;
    });
  }

  renderProducts();
})();
