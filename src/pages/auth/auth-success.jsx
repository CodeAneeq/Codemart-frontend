import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import baseURL from '../../services/constant'
import { addUser } from '../../redux/features/user-slice'
import Loader from '../../components/loader/loader'

const AuthSuccess = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {

        const handleAuth = async () => {
            const params = new URLSearchParams(window.location.search)
            console.log(params);
            const accessToken = params.get("token")
            console.log("Token", accessToken);

            if (accessToken) {
                localStorage.setItem("accessToken", accessToken)
                try {
                    const res = await axios.get(`${baseURL}/auth/me`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    })
                    console.log(res);
                    
                    if (res.data?.status == "success") {
                        dispatch(addUser(res?.data?.data))
                        localStorage.setItem("token", res?.data?.data?.token)
                        navigate("/")
                    }
                } catch (error) {
                    console.error("Error fetching user:", error)
                }
            }
        }
        handleAuth()
    }, [navigate])
    return (
        <h2 style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Loader/>
        </h2>
    )
}

export default AuthSuccess