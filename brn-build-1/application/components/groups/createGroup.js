import React from 'react-native';
import Globals from '../../styles/globals';
import Config from '../../../config';
import Technologies from '../../technologies';
import SelectTechnology from './selectTechnology';
import Input from '../shared/input';
import Cell from '../shared/cell';
import Loading from '../shared/loading';

let {
    View,
    ScrollView,
    Text,
    DatePickerIOS,
    TouchableOpacity,
    StyleSheet,
} = React;

class createGroup extends React.Component {
    constructor(props) {
        super(props);
        this._handleChange = this._handleChange.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
        this.state = {
            data: null,
            formData: {
                groupName: "",
                groupDescription: ""
            }
        }
    }
    _createGroup() {
        this.props.loading(true);
        let requestData = this.state.formData;
        Object.assign(requestData, {createdBy: this.props.user.userId});
        fetch(Config.apiBaseUrl+"/groups", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData)
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.errors) {
                    this.props.loading(false);
                    console.log(data.errors);
                }
                else {
                    this.props.loading(false);
                    console.log(data);
                }
            })
            .catch((error) => console.log(error))
            .done();
    }
    _handleChange(name, text) {
        let formData = this.state.formData;
        formData[name] = text;
        this.setState({
          formData: formData
        });
    }
    _handleSubmit() {
        this.props.loading(true);
        this._createGroup();
    }
    render() {
        return (
        <View style={{flex : 1}}>
            <View style={Globals.inactiveContainer}>
                <ScrollView style={styles.scrollView}>
                    <Input
                      placeholder="this is a placeholder"
                      label="What's the group name?"
                      name="groupName"
                      value={this.state.formData.eventName}
                      handleChange={this._handleChange}
                    />
                    <Input
                      placeholder="this is a placeholder"
                      label="Who's the group for?"
                      type="textarea"
                      name="groupDescription"
                      value={this.state.formData.eventDescription}
                      handleChange={this._handleChange}
                    />
                  <View style={Globals.inputContainer}>
                    <Text style={Globals.inputLabel}>What technology is involved?</Text>
                    {this.state.error ?
                      <Text style={Globals.inputError}>{this.state.error}</Text>
                      :
                      null
                    }
                    <TouchableOpacity onPress={() =>
                      this.props.navigator.push({
                        title: 'Technology Select',
                        component: SelectTechnology
                    })}>
                      <Cell placeholder="Choose a technology" arrow={true} />
                    </TouchableOpacity>
                  </View>
                    <TouchableOpacity onPress={this._handleSubmit} style={[Globals.button, styles.button]}>
                      <Text style={Globals.buttonText}>Create Group</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
        )
    }
};

const styles = StyleSheet.create({
    scrollView: {
        paddingTop: 60
    },
    button: {
        alignSelf: 'flex-end'
    }
});

module.exports = createGroup;
