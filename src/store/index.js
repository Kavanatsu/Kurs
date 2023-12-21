import { createStore } from "vuex";
import { articleModule } from "@/store/modules/articleModule";
import { favouriteModule } from "@/store/modules/favouriteModule";
import { auth } from "@/store/modules/auth";


export default createStore({
	state: () => ({
	}),
	getters: {
	}, 
	mutations: {
	},
	actions: {
	},
	modules: {
		article: articleModule,
		favourite: favouriteModule,
		auth,
	}
})