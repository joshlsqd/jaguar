import React, {Component} from 'react';
import TaskToday from './taskview/TaskToday'
import TaskDay from './taskview/TaskDay'
import TaskUnplanned from './taskview/TaskUnplanned'
import moment from 'moment';
import AppLayout from './layout/AppLayout'
import NavSidebar from './layout/NavSidebar'

class UserView extends Component {

    render() {
        const tomorrow = moment(Date.now()).add(1,'day').format('YYYY-MM-DD');
        const plus2 = moment(Date.now()).add(2,'day').format('YYYY-MM-DD');
        const plus3 = moment(Date.now()).add(3,'day').format('YYYY-MM-DD');
        const plus4 = moment(Date.now()).add(4,'day').format('YYYY-MM-DD');
        const plus5 = moment(Date.now()).add(5,'day').format('YYYY-MM-DD');
        return(
            <AppLayout>
                <NavSidebar/>
                <div ><TaskToday /></div>
                <div className='section B'><TaskUnplanned /></div>
                <div className='section C'>
                    <div className='subsections sA'><TaskDay day={tomorrow}/></div>
                    <div className='subsections sB'><TaskDay day={plus2}/></div>
                    <div className='subsections sC'><TaskDay day={plus3}/></div>
                    <div className='subsections sD'><TaskDay day={plus4}/></div>
                    <div className='subsections sE'><TaskDay day={plus5}/></div>
                </div>
            </AppLayout>
        )
    }
}

export default UserView;