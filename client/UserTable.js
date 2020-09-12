import React, { Component } from 'react';

class UserTable extends Component {
  static propTypes = {
    users: [],
    onDelete: () => {},
  }

  renderContent() {
    const content = this.props.users.map(user => (
      <tr key={`tr-${user.id}`}>
        <td>
          <img
            alt="avatar"
            style={styles.avatar}
            src={user.picture}
          />
        </td>
        <td>
          {user.id}
        </td>
        <td>
          {user.firstName}
        </td>
        <td>
          <button
            type="button"
            onClick={() => {
              this.props.onDelete(user.id);
            }}
          >
            Delete
          </button>
        </td>
      </tr>
    ));

    return (
      <React.Fragment>
        <th></th>
        <th>id</th>
        <th>name</th>
        {content}
      </React.Fragment>
    )
  }

  render() {
    return (
      <table>
        <tbody>
          {this.renderContent()}
        </tbody>
      </table>
    );
  }
}

const styles = {
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  }
}

export default UserTable;