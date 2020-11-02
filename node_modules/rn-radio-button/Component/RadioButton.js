import React, { useState } from "react";
import { Text, View, TouchableWithoutFeedback } from "react-native";
import styles from "./RadioButton.style";

const RadioButton = props => {
  const [checked, setChecked] = useState(null);

  function innerCircle() {
    const { color, outerWidth, innerWidth } = props;
    let size = 0;
    if (outerWidth) {
      if (innerWidth) {
        size = innerWidth;
      } else {
        size = outerWidth / 2;
      }
    }

    return (
      <>
        <View
          style={[
            styles.innerCircle,
            color && { backgroundColor: color, borderColor: color },
            outerWidth && {
              width: size,
              height: size,
              borderRadius: size / 2
            }
          ]}
        />
      </>
    );
  }

  function renderContent() {
    const { horizontal, data } = props;
    let dataList = [];
    if (data && data.length > 0) {
      dataList = data;
    }

    return (
      <View style={[styles.renderStyle, horizontal && styles.horizontalStyle]}>
        {dataList.map((item, i) => {
          return listBar(item, i);
        })}
      </View>
    );
  }

  function wrapperCicle(item) {
    const { color, outerWidth, borderWidth } = props;
    const { value } = item;

    return (
      <View
        style={[
          styles.outerCircle,
          color && { borderColor: color },
          outerWidth && {
            width: outerWidth,
            height: outerWidth,
            borderRadius: outerWidth / 2
          },
          borderWidth && { borderWidth }
        ]}
      >
        {stringified(checked) === stringified(value) && innerCircle()}
      </View>
    );
  }

  function stringified(item) {
    return JSON.stringify(item);
  }

  function pressCheck(value) {
    const { onPress } = props;
    setChecked(value);
    if (onPress) {
      onPress(value);
    }
  }

  function renderLogic() {
    const { data } = props;
    if (data && data.length > 0) {
      if (data[0] && data[0].value && data[0].label) {
        return renderContent();
      } else {
        return null;
      }
    }
    return null;
  }

  function listBar(item, i) {
    const { wrapperStyle } = props;
    const { label, value } = item;

    return (
      <TouchableWithoutFeedback key={i} onPress={() => pressCheck(value)}>
        <View
          key={i}
          style={[styles.outerWrapper, wrapperStyle && wrapperStyle]}
        >
          <View style={styles.circleWrap}>{wrapperCicle(item)}</View>
          <View style={styles.textDesc}>
            <Text>{label}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  return renderLogic();
};

export default RadioButton;
