import './globals.css'
import BlurryCursor from './components/cursor';
import TiltImage from './components/TiltImage'
import logo from '@/../public/patriuz_logo.png'
export default function home(){

  return(
      <div className='flex mx-auto px-30 justify-self-center justify-center items-center my-10 min-h-screen w-full self-center align-middle'>
        <div className="neumorphism flex-col align-middle items-center justify-center mx-12 h-4/6 lg:mx-64 w-full p-5 rounded-2xl">
          
          <TiltImage className="flex-row justify-center align-middle items-center my-auto" src={logo} alt="Logo da patriuz" height={200} width={200}/>
          <p className='text-black my-10 text-center'>Seja bem vindo a patriuz!! Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa fuga magnam maxime voluptatibus sed! Eaque, laboriosam libero sint harum vero fuga aliquam corporis maxime, odio magni a labore cumque tempora.</p>

        <form class="bg-transparent px-8 pt-6 pb-8 mb-4">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
              Username
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text"/>
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="Email">
              Email
            </label>
            <input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password"/>
         </div>
          <div class="flex items-center justify-between">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
              Enviar 
            </button>
       
          </div>
        </form>
        </div>
        {/* <BlurryCursor/> */}

      </div>
  )
}