import React, { useState, useEffect } from 'react'
import { Formik } from "formik"
import { Button } from "../../Common/Buttons/Buttons"
import { DateInput, SelectInput } from "../../Common/InputField/InputField"
import * as Yup from 'yup';

const ReportDownload = () => {
    return (<>
        <Formik
            initialValues={{
                "batchName": '',
                "course": '',
                "participant": '',
                'from': '',
                'to': ''
            }}
            onSubmit={(values) => console.log(values)}>
            {({ handleSubmit }) => (<>
                <form onSubmit={handleSubmit} className="my-5">
                    <div className="jcc">
                        <div> <SelectInput option={['batch 1', 'Batch 2', 'Batch 3', 'Batch 4']} label="Batch Name" name="batchName" /></div>
                        <div className="mx-5"> <SelectInput option={['course 1', 'course 2', 'course 3', 'course 4']} label="Course" name="course" /></div>
                        <div> <SelectInput option={['p1 1', 'p 2', 'p 3', 'p 4']} label="Participants" name="participant" /></div>
                    </div>
                    <div className="jcc">
                        <div className="mr-5"><DateInput name="from" label="From" /></div>
                        <div><DateInput name="to" label="To" /></div>
                    </div>
                    <div className="text-center mt-2">
                        <Button type="submit" className=" mr-2 px-4">Ok </Button>
                        <Button type="submit" className=" px-4">Reset </Button>
                    </div>
                </form>
            </>)}

        </Formik>
    </>)
}
export default ReportDownload