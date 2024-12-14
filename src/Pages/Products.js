"use client";
import React from "react";
import { useState, useEffect } from "react";
import MainNav from "../components_Folder/page_Navigation";
import { pictures } from "../components_Folder/slide_Images";
import backPic from "../Img_Folder/BackofBag.jpeg";
import '../Styles/Products.css';

const Scroll_Top_Default = () => {
    React.useEffect(() => {
      window.scrollTo(0,0);
    }, []);
  }


function New_Ingredient({images}){
    const [currentState, setcurrentState] = useState(0);
    const [auto, setauto] = useState(true);
    let timeOut = null;
    
    useEffect(() => {
     timeOut = auto && setTimeout(() => {
        slide_Right_Img()
     }, 10000); 
    });

    const slide_Right_Img = () => {
        setcurrentState(currentState === images.length - 1 ? 0 : currentState + 1);
    }
     return <div className="image_Slide" 
     onMouseEnter={() => {
        setauto(false);
        clearTimeout(timeOut)
     }}
     onMouseLeave={() => {
        setauto(true);
     }}>
        <div className="image_Slider_Wrapper">
            {images.map((images, index) => {
                return(
                    <div key={index} className={index === currentState ? "picture_Select picture_Select-Active" : "picture_Select"}> 
                        <img src={images.image} alt={images.title}/>
                        <p id="image_Txt">{images.title}</p>
                    </div>
                    
                )

                
            })}

              {/* little dots that go inside the image so that the user can quickly access a image without
              having to wait for looping animation */}
                        <div className="picture_Select_Options">
                            {images.map((_, index) => {
                                
                                return <div key={index} className={index === currentState ? "picture_Select_Cards picture_Select_Cards-Active" : "picture_Select_Cards"} onClick={() => setcurrentState(index)}>
                                    
                                </div>
                            })}
                        </div>
        </div>
     </div>

};



const Products_App = () => {
    <Scroll_Top_Default/>
    return(
        <div>

            <MainNav/>

            <div id="products_Head">
                <h2>Different ingredients in our dog food</h2>
                <h5><strong>All</strong> Bags come with Salmon and Tuna</h5>

                    
                <div id="ingredient_Area">
                <New_Ingredient images={pictures} text={pictures}/>
                </div>

            </div>

            <div id="product_Body">
                <div id="times_Feeding">
                    <div id="times_Feeding_Wrapper">
                        <h4>Feeding Instructions</h4>
                        <p className="feeding_Instructions_Txt">How many cups should you feed them?</p>
                        <p className="feeding_Instructions_Txt">At the back of every bag will be a set of instructions that depend on the size of your dog. Each meal should be fed to your dog a total of twice a day during morning/afternoon</p>


                        <div id="cup_Weight">
                            <h3>Cup amounts for each lbs <strong>Only Feed 2 times Per Day</strong></h3>
                            <ul>
                                <li>5-10LBS  ---      3/4 to 1 1/2 cups</li>
                                <li>11-35LBS   ---     1 1/2 to 2 1/2 cups</li>
                                <li>36-60LBS    ---   2 1/2 to 3 1/2 cups </li>
                                <li>60+ LBS    ---     Add 1/3 - 1 cup every 2-5LBS</li>
                            </ul>
                        </div>

                        <div id="storing_Prep_Instructions">
                            <h2>Storage</h2>
                            <p>For the best results keep food refrigerated for up to 5 days while if frozen only up to 4 weeks. If you have frozen food be sure to thaw before prepping.</p>

                            <h2>Prepping</h2>
                            <p>Once food is thawed or removed from refrigerator place inside microwave either left in bag or in microwave safe container for 1-2min(s) or until heated (1000W) and add up to 1 cup of warm water then stir.</p>
                        </div>
                    </div>

                    <img src={backPic}/>                
                </div>
            


            <div id="extra_Features">
                    <div id="extra_Features_Wrapper">
                        <h2>Extras</h2>
                        <p>On their first purchase each customer will be able to recieve a small holder that will be used to place your food in when it is delievered free of charge.</p>
                        <p>Each customer will only recieve one without any exceptions</p>


                        <p>(Add anything else the business does like promotions or gifts)</p>
                    </div>

                    <img src={backPic}/>
            </div>
           </div>
        
        
      <footer id="product_Footer">
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
        </footer>


        </div>
    )
}

export default Products_App;