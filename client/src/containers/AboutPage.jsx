import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Card from '@material-ui/core/Card';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
    textAlign: 'center'
  },
  font:{
    textAlign: 'center'
  }
};


function handleActive(tab) {
  alert(`A tab with this route property ${tab.props['data-route']} was activated.`);
}

const TabsExampleSimple = () => (
    <Tabs>
    <Tab label="About" >
         <div>
        <Card className="container">
        <h2 style={styles.headline}>What is Inventory Assistant?</h2>
        <p style={styles.font}>
        Sale Assistant is your real time sales tracker. Sale Assistant's objective is to help the freelancer keep track of inventory, without having to pay a full time assistant.
        </p>
        <p>
        Notice which one of your products are quickly flying off the shelves, and identifiying which products might need that extra push, without having to pay a ton of money for a VP of marketing.
        </p>
        <p>
        To get all these features and more, at a quality price, click the signup button today at the top of your screen.
        </p>
        </Card>
      </div>
    </Tab>
    <Tab label="Contact Us" >
   <div>
        <Card className="container">
        <h2 style={styles.headline}>Contact Us</h2>
       <p><a href="http://www.github.com/rwa4791"> Robert Angus</a></p>
        <p><a href = "https://github.com/hcandelaria">
           Hector Candelaria
        </a></p>
          <p> <a href = "https://github.com/Christian-Vasquez">
           Christian Vasquez
        </a></p>
        </Card>
      </div>
    </Tab>

  </Tabs>
);

export default TabsExampleSimple;
