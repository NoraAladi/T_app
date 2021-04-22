import React, {FC, useMemo} from "react";
import {useTranslation} from "react-i18next";
import {StyleSheet, View} from "react-native";
import CategoryStoreItem from "./CategoryStoreItem";
import {Pixel} from "../../constants/styleConstants";

interface ICategoryStoresList {
  data: Array<{ id: string; title: string; image: string; }>;
}

const CategoryStoresList: FC<ICategoryStoresList> = ({data}) => {

  const {t} = useTranslation();
  const categoryStoresMemo = useMemo(
    () =>
      data.map((item, index) => {
        return <CategoryStoreItem key={index} isLast={index === data.length - 1} index={index} {...item}/>;
      }),
    [data],
  );

  return (
    <View style={styles.categoryStoresList}>
      {categoryStoresMemo}
    </View>
  );
};

const styles = StyleSheet.create({
  categoryStoresList: {
    marginTop: Pixel(25),
  }
});

export default CategoryStoresList;
