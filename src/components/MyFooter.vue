<template>
    <footer>
			<section class="wrap">
        <section class="nav-footer">
            <div class="links-footer">
							<router-link class='link main' :to='`/`'>Главная</router-link>
              <router-link class='link' :to='`/about`'>О нас</router-link>
							<router-link class='link' :to='`/articles`'>Статьи</router-link>
							<router-link class='link' :to='`/personal`'>Личный кабинет</router-link>
            </div>
            <div class="search">
                <input class="search" type="search" placeholder="Поиск" name="search">
            </div>
        </section>
				<section class="info">
					<p>© 2023  KARMA Здоровый Образ Жизни</p>
				</section>
			</section>
    </footer>
</template>

<script>
export default {
    
}
</script>

<style scoped>
footer {
    display: flex;
    justify-content: center;
    background-color: #ffc229;
    padding: 20px 0;
    border-bottom: 1px solid #ffb803;
		flex-direction: column;
		align-items: center;
}

.nav-footer {
  display: flex;
  flex-direction: row;
	justify-content: space-between;
	width: 100%;
}

.links-footer {
    display: flex;
    flex-direction: column;
    width: 400px;
}

.info {
	border-top: 1px solid #242423;
	margin: 10px 0;
	padding: 10px 0;
	width: 100%;
}


input {
    font-family: Cleanvertising-Light;
    padding: 5px 7px;
    background-color: #fcf2d7;
    border-radius: 25px;
    border: 1px solid  #faecc8;
    width: 200px;
		font-size: 13pt;
}

input:hover {
    background-color: #faecc8;
    border: 1px solid  #faecc8;
}

input:focus {
    background-color: #faecc8;
    border: 1px solid  #ffb803;
    outline: none;
    color: #242423;
}

input:active {
    background-color: #faecc8;
    border: 1px solid  #ffb803;
    outline: none;
    color: #242423;
}
</style>