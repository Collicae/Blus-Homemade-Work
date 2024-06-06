import React, { useState, useEffect } from "react";
import mainPage_BluPic from '../Img_Folder/mainPage_BluPic.jpeg';
import slidepic1 from '../Img_Folder/pictureforPage1.jpeg';
import custom_Pic from "../Img_Folder/cst_Pic.jpeg";
import pre_Made_Pic1 from "../Img_Folder/SweetP with BB.jpeg";
import pre_Made_Pic2 from "../Img_Folder/veggie with BB.jpeg";
import '../Styles/Home.css';
import MainNav from "../components_Folder/page_Navigation";
import {FiChevronsLeft, FiChevronRight, FiShoppingBag} from "react-icons/fi";
//Create the heading of the page (Should be on the left)

let cart_Holdings = 0;

const ScrollTopDefault = () => {
  React.useEffect(() => {
    window.scrollTo(0,0);
  }, []);
};



const Slideshow = ( {slide_Pics} ) => {
  const [index, setindex] = useState(0);

  useEffect(() => {
    setindex(0)
  }, [])


  const next_Pic = () => {
    {index === slide_Pics.length - 1 ? (setindex(0)) : (setindex(index + 1))}
  };

  const previous_Pic = () => {
    {index === 0 ? (setindex(slide_Pics.length -1)) : (setindex(index -1))}
  };

  return <div id="picture_btn_Elements">
      <img className="main_Image" src={slide_Pics[index]} alt="Pictures for front page" />
    <div id="img_Btn">
      <p onClick={previous_Pic} className="button_T"><FiChevronsLeft/></p>
      <p onClick={next_Pic} className="button_T"><FiChevronRight/></p>
    </div>
  </div>
};


//Connects with the page to activate elements when the page scrolls while not leaking
//on other pages 
const HomepageComp = () => {
  useEffect(() => {
    const handle_Scroll = () =>{

      const header_Txt = document.querySelector('h1');
      const sub_Txt1 = document.getElementById('first_setTxt');
      const sub_Txt2 = document.getElementById('second_setTxt');
      const nav_Bar_Head = document.querySelector('nav');
      const scroll_Position = window.scrollY;
      console.log(window.innerHeight)
    
      if (scroll_Position > 260) {
        header_Txt.classList.add('show')
      };
    
      if(scroll_Position > 400) {
        sub_Txt1.classList.add('show')
      };
    
      if(scroll_Position > 430) {
        sub_Txt2.classList.add('show')
      };
    
      if (scroll_Position > 500) {
        nav_Bar_Head.style.backgroundColor = 'rgba(164, 188, 206, 1)'
      } else {
        nav_Bar_Head.style.backgroundColor = 'rgba(164, 188, 206, 0.75)'
      };
    
    }
    window.addEventListener('scroll', handle_Scroll);

    return () => {
      window.removeEventListener('scroll', handle_Scroll);
    };
  }, []);

};




const CustomProductsMenu = () => {
//Allow the user to customize their bags for purchases (might be created in future updates)
//Also will have to find a way to update nutritional info when the user changes portion amount
  

  return <div className="outer_Main_Slider">
      <div className="group_Selection" id="custom_Selection"> {/*This does not work add the useRef = (); while adding it to this div*/}

          <div className="inner_Main_Slider">
          <a href="#">
            <img src={custom_Pic} alt="custome bag" />
            Custom Bag
            </a>
          </div>

      </div>
  </div>

};

const PremadeProductsMenu = () => {
//Allows the user to pick from already made bags of blu's homemade. Comes in (Veggie/Bean, SweetPotato/BlackBean, SweetPotato/BrownRice)
//Nutritional info coming once you finish the scrolling part  

return <div className="outer_Main_Slider">
    <div className="group_Selection"> {/*This does not work add the useRef = (); while adding it to this div*/}

        <div className="inner_Main_Slider">
        <a id="veggieBB" href="#">
          <img src={pre_Made_Pic2} alt="food 1" />
          Veggies w/ BlackBean</a>
        </div>
        
        <div className="inner_Main_Slider">
        <a id="sweetPoBR" href="#">
          <img src={custom_Pic} alt="food 2" />
          SweetPotato w/ BrownRice</a>
        </div>

        <div className="inner_Main_Slider">
        <a id="SweetPoBB" href="#">
          <img src={pre_Made_Pic1} alt="food 3" />
          SweetPotato w/ BlackBean</a>
        </div>

    </div>
</div>

};

const Main_App = () =>{

    return(
      <div>
    <ScrollTopDefault />
    <HomepageComp />

      <div id="root">
      <MainNav/>

      <div id="main_Header">
      <h2>Blu's Homemade</h2>
      <img src={mainPage_BluPic} alt="picture_of_Blu" id="mainPage_PicHead"/>
      </div>

      <div id="homepage_Head"> {/*Put the slogan for blu's homemade here */}
            <h2>Let's Love Our Kiddo's Together</h2>
      </div>

      <div id="homepage_Image">
        <div>
            <img  src={slidepic1} />
        </div>
      </div>

      <div id="main_Background2">
        <div id="main_AboutUS">
           
          <h1 id="about_Us" className="aboutUS_INFO">More About Us! </h1>

          <p id="first_setTxt" className="aboutUS_INFO">"Tell discription of what the family is like" Just testing out the range</p>
            <br/>
          <p id="second_setTxt" className="aboutUS_INFO">"Tell more descriptions of what the family is like "</p>
        
        </div>
      </div>

      <div id="store_Header">
          <div>
            <h1>Dog Food</h1>
          </div>
      </div>

      <div id="store_Body">
      <a id="shopping_Cart">{cart_Holdings}<FiShoppingBag  /></a>
      
        <nav>
            <h4 className="select_Header_Type">Custom:</h4>
                <CustomProductsMenu />
        </nav>

        <nav>
            <h4 className="select_Header_Type">Pre-Made:</h4>
                <PremadeProductsMenu />
        </nav>
      </div>


      <footer>
        <table>
          <thead>
          <tr>
            <th>Contact Us</th>
          </tr>
          </thead>

          <tbody>
          <tr>
            <td>Person 1</td>
            <td>"Insert Number Here"</td>
          </tr>
        <tr>
          <td>Person 2</td>
          <td>"Insert Number Here"</td>
        </tr>
        </tbody>
       
        </table>


        <table>
          <tbody>
          <tr>
            <td>More Options coming soon</td>
          </tr>
          </tbody>
        </table>

        
        {/* Only add if they have other social media accounts they would like to add */}
        {/*<h2 id="footer_Socials">Follows Us on Other sites</h2>*/}

      </footer>
      </div>
      </div>
    )
  };
  
  
  export default Main_App;