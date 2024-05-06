import React from 'react'
import Layout from '../components/Layout/Layout'

const About = () => {
  return (
  <Layout title={"About us - Tourist Sites App"}>
    <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="https://i.ytimg.com/vi/nLCL9GOU0MQ/maxresdefault.jpg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
          India is one of the most beautiful countries in the world and is best known for its colourful culture and fascinating heritage. Its grand monuments, like the Taj Mahal act as strong pillars of the rich and deep history that India possesses. 
          From their splendid architecture to a strong legacy, the historical monuments of India speak volumes. Most of these Indian monuments were primarily built under the regime of Rajputana, Dravidian and Mughal emperors.
         The monuments of India are speaking stones of the glory of its rulers and the brilliance of artisans in ancient India. Due to the incredible beauty of India and the constant efforts of the government in maintaining the heritage sites, 
         India tourism has flourished rapidly witnessing an increase in the number of travellers from all around the world. Some of the well-preserved monuments in the different parts of the country are Red Fort (North), Sun Temple Konark (East), Amer Fort (West) and Charminar (South).
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About