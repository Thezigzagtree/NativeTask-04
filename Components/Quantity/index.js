import React from "react";
import { observer } from "mobx-react";

import AuthStore from "../../store/authStore";

// Navigation
import { withNavigation } from "react-navigation";

// NativeBase Components
import { Text, Button, Icon } from "native-base";

//Store
import CartStore from "../../store/cartStore";
import authStore from "../../store/authStore";

class Quantity extends React.Component {
  navigate() {
    if (authStore.isAuthenticated) {
      let route = this.props.route;
      this.props.navigation.navigate(route);
    } else this.props.navigation.navigate("Login");
  }

  render() {
    return (
      <Button light transparent onPress={() => this.navigate()}>
        <Text>
          {CartStore.quantity + " "}
          <Icon
            type="FontAwesome"
            name="coffee"
            style={{ color: "white", fontSize: 15 }}
          />
        </Text>
      </Button>
    );
  }
}

export default withNavigation(observer(Quantity));
