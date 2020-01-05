	alphabetizedList () {
    const teamPos = this.props.findPositionsOnTeam(this.props.state.teamObject.id).sort((x, y) => {
      const a = this.props.findUserByID(x.user_id)
      const b = this.props.findUserByID(y.user_id)
      if (a === b) {
        return 0
      } else if (a === undefined) {
        return 1
      } else if (b === undefined) {
        return -1
      } else {
        return a.name > b.name ? 1 : -1
      }
    })
    return teamPos.map(tp => this.props.findUserByID(tp.user_id))
  }