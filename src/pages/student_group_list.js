




const student_group_list = () =>{

    return(
    <ListGroup >
        <ListGroup.Item className={styles['coursesection']}>
        <Container >
        <Row >
          <Col md={7} > Group name: hhhh  </Col>
          <Col  md={{ span: 2, offset: 2 }}>
            <Button className = {styles['list_iterm_button']} variant="outline-secondary">Request to join</Button>
          </Col>
        </Row>
        
        <Row xs="auto">
          <Col style={{fontSize:12}}>Group size:</Col>
          <Col style={{fontSize:12}}>Current size:</Col>
          <Col style={{fontSize:12}}>Section number:</Col>
        </Row>
        
        <Row >
          <Col style={{fontSize:13}} md={8}className={styles['listcontainer']} > Description:</Col>
        </Row>
        
        <Row >
          <Col style={{fontSize:13}} md={7}className={styles['listcontainer']} > hi, we are hhh group. we are looking for one more groupmember hhh hhh hhh hhh hhh hhh hhh hhhh hhhh hhh hhhh hhh hh hhh hhh .</Col>
          <Col  md={{ span: 2, offset: 3 }} style={{ color:"grey",fontSize:10 }}>See more details</Col>
        </Row>  
        
        </Container>
          </ListGroup.Item>
        </ListGroup>
    )

}
