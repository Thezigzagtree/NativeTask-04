import React, { Component } from "react";
import { observer } from "mobx-react";

import authStore from "../../store/authStore";

// NativeBase Components
import { List, Content, Footer, Button, Text } from "native-base";

// Store
import CoffeeStore from "../../store/coffeeStore";

// Component
import CoffeeItem from "./CoffeeItem";
import Quantity from "../Quantity";

class CoffeeList extends Component {
  bottomButton() {
    if (authStore.isAuthenticated) {
      return (
        <Footer>
          <Button
            onPress={() => {
              authStore.logoutUser();
              this.props.navigation.replace("Login");
            }}
          >
            <Text>Logout {authStore.user.username}</Text>
          </Button>
        </Footer>
      );
    } else {
      return (
        <Footer>
          <Button onPress={() => this.props.navigation.navigate("Login")}>
            <Text>Login</Text>
          </Button>
        </Footer>
      );
    }
  }
  static navigationOptions = ({ navigation }) => ({
    title: "Coffee List",
    headerLeft: null,
    headerRight: <Quantity route="CoffeeCart" />
  });
  render() {
    const coffeeshops = CoffeeStore.coffeeshops;
    let ListItems;
    if (coffeeshops) {
      ListItems = coffeeshops.map(coffeeShop => (
        <CoffeeItem coffeeShop={coffeeShop} key={coffeeShop.id} />
      ));
    }
    return (
      <Content>
        <List>{ListItems}</List>
        {this.bottomButton()}
      </Content>
    );
  }
}

export default observer(CoffeeList);
