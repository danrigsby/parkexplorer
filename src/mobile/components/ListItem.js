var React = require('react-native');
const { View, TouchableHighlight, Text } = React;

class ListItem extends React.Component {
    render() {
        return (
            <TouchableHighlight onPress={this.props.onPress}>
                <View style={styles.li}>
                    <Text style={styles.date}>
                        {this.props.item.date}
                    </Text>
                    {
                        this.props.item.text
                        ?
                            <Text style={styles.liText}>
                                <Text style={styles.bold}>{this.props.item.user}</Text> found {this.props.item.text}
                            </Text>
                        :
                            <Text style={styles.liText}>
                                <Text style={styles.bold}>{this.props.item.user}</Text> said "the park was {this.props.item.crowd}. The condition of the equipment in the park is {this.props.item.equipmentCondition} and my overall experience is {this.props.item.overallExperience}"
                            </Text>
                    }
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = React.StyleSheet.create({
    li: {
        backgroundColor: '#fff',
        borderBottomColor: '#eee',
        borderColor: 'transparent',
        borderWidth: 1,
        paddingLeft: 16,
        paddingTop: 14,
        paddingBottom: 16,
    },
    liText: {
        color: '#333',
        fontSize: 16,
    },
    date: {
        color: '#A9A9A9',
        fontStyle: 'italic'
    },
    bold: {
        fontWeight: 'bold'
    }
});

module.exports = ListItem;
