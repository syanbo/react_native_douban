import React, { PureComponent } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableHighlight
} from "react-native";
import Swiper from "react-native-swiper";
import { getInTheaters } from "../../service/api";

export default class extends PureComponent {
  state = {
    start: 1,
    contentList: [] // 热映列表数据
  };

  componentDidMount() {
    this.getInTheatersList();
  }

  getInTheatersList = async () => {
    // 获取热映列表

    const params = {
      apikey: "0b2bdeda43b5688921839c8ecb20399b",
      city: "上海",
      start: this.state.start,
      count: 15
    };
    try {
      const res = await getInTheaters(params);
      if (res && res.subjects && res.subjects.length > 0) {
        this.setState({
          contentList: res.subjects
        });
      }
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { contentList } = this.state;
    return (
      <ScrollView style={sty.container}>
        <View style={sty.top}>
          <Swiper style={sty.swiperWrap} height={200}>
            {contentList.map((d, index) => {
              return (
                <View key={index} style={sty.swiper}>
                  <Image
                    style={sty.swiper_pic}
                    source={{ uri: d.images.large }}
                  />
                  <View style={sty.titleTop}>
                    <Text style={sty.tit}>{d.title}</Text>
                  </View>
                </View>
              );
            })}
          </Swiper>
        </View>
        <View style={sty.content}>
          {contentList.map((item, index) => {
            return (
              <TouchableHighlight
                key={index}
                onPress={() => {
                  console.log("detail", "222");
                  this.props.navigation.navigate("Detail", {
                    id: item.id
                  });
                }}
              >
                <View style={sty.item}>
                  <View style={sty.pic_info}>
                    <Image
                      style={sty.moviePic}
                      source={{ uri: item.images.small }}
                    />
                    <View style={sty.vip}>
                      <Text style={sty.vip_text}> VIP</Text>
                    </View>
                    <View style={sty.average}>
                      <Text style={sty.count}>{item.rating.average}</Text>
                    </View>
                  </View>
                  <View style={sty.movie_info}>
                    <Text style={sty.name}>{item.title}</Text>
                    <Text style={sty.types}>
                      {item.genres.map((i, v) => {
                        return (
                          <Text key={v} style={sty.type}>
                            {i}
                          </Text>
                        );
                      })}
                    </Text>
                  </View>
                </View>
              </TouchableHighlight>
            );
          })}
        </View>
      </ScrollView>
    );
  }
}

const sty = StyleSheet.create({
  container: {
    flex: 1
  },
  top: {
    flex: 1
  },
  swiperWrap: {
    // width: 375,
    // height: 200
  },
  swiper: {
    width: 375,
    height: 200,
    position: "relative"
  },
  swiper_pic: {
    width: 375,
    height: 200,
    position: "absolute",
    left: 0,
    top: 0
  },
  titleTop: {
    width: 200,
    height: 30,
    position: "absolute",
    left: 30,
    bottom: 10
  },
  tit: {
    width: 200,
    height: 30,
    textAlign: "center",
    fontSize: 20
  },
  content: {
    flex: 3,
    justifyContent: "flex-start",
    flexDirection: "row",
    padding: 1,
    flexWrap: "wrap"
  },
  item: {
    height: 180,
    width: 120
  },
  pic_info: {
    width: 120,
    height: 120,
    position: "relative"
  },
  moviePic: {
    position: "absolute",
    height: 120,
    left: 0,
    top: 0,
    width: 120
  },
  vip: {
    position: "absolute",
    width: 30,
    height: 15,
    right: 3,
    top: 0,
    borderRadius: 3
  },
  vip_text: {
    width: 30,
    height: 20,
    color: "white",
    fontSize: 14,
    textAlign: "center"
  },
  average: {
    position: "absolute",
    width: 30,
    height: 20,
    right: 3,
    bottom: 3
  },
  count: {
    width: 30,
    height: 20,
    color: "yellow",
    fontSize: 14,
    textAlign: "center"
  },
  movie_info: {
    height: 60,
    width: 120
  },
  name: {
    width: 120,
    height: 30,
    color: "#666666",
    fontSize: 13,
    textAlign: "center",
    lineHeight: 30
  },
  types: {
    flexDirection: "column",
    width: 120,
    height: 30,
    justifyContent: "center"
  },
  type: {
    width: 30,
    height: 30,
    color: "gray",
    fontSize: 10,
    textAlign: "center",
    lineHeight: 30
  }
});
