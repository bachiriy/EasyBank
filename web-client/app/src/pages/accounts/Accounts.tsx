import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Account } from '../../interface/Account';
import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';


const url = process.env.REACT_APP_API_URL;

const Accounts = () => {
    const client = axios.create({
        baseURL: url + "accounts",
    });
    
    const [accounts, setAccounts] = useState<Account[]>([]);

    useEffect(() => {
        getAccounts();
    }, []);

    const getAccounts = async () => {
        try {
            const response: AxiosResponse = await client.get(``);
            if (response.status === 200) {
                setAccounts(response.data);
            }  
        } catch(err) {
            console.log(err);
        }
    }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#ID</TableCell>
            <TableCell align="right">Balance</TableCell>
            <TableCell align="right">Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {accounts.map((acc) => (
            <TableRow
              key={acc.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {acc.id}
              </TableCell>
              <TableCell align="right">{acc.balance}</TableCell>
              <TableCell align="right">{acc.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default Accounts;
