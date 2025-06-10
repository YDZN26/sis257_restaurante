<template>
  <div class="about">
    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div class="col">
        <div class="card">
          <img src="@/assets/img/menu/1.jpg" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">Pizza Media</h5>
            <p class="card-text">Precio 25</p>
            <RouterLink to="/platillos/crear" class="btn btn-primary btn-lg">Pedir</RouterLink>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <img src="@/assets/img/menu/2.jpg" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">Hamburguesa</h5>
            <p class="card-text">Precio 8bs</p>
            <RouterLink to="/platillos/crear" class="btn btn-primary btn-lg">Pedir</RouterLink>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <img src="@/assets/img/menu/3.jpg" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">Tacos</h5>
            <p class="card-text">Precio 15bs</p>
            <RouterLink to="/platillos/crear" class="btn btn-primary btn-lg">Pedir</RouterLink>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <img src="@/assets/img/menu/4.jpg" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">Pollo Frito</h5>
            <p class="card-text">Precio 35bs</p>
            <RouterLink to="/platillos/crear" class="btn btn-primary btn-lg">Pedir</RouterLink>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <img src="@/assets/img/menu/5.jpg" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">Salteña</h5>
            <p class="card-text">Precio 5bs</p>
            <RouterLink to="/platillos/crear" class="btn btn-primary btn-lg">Pedir</RouterLink>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <img src="@/assets/img/menu/6.jpg" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">Rodaja de Pastel</h5>
            <p class="card-text">Precio 10bs</p>
            <RouterLink to="/platillos/crear" class="btn btn-primary btn-lg">Pedir</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
