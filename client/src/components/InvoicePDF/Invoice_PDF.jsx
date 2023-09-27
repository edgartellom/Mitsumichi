// import React from "react";
// import {
//   Document,
//   Page,
//   Text,
//   View,
//   StyleSheet,
//   Image,
// } from "@react-pdf/renderer";
// import { parsePhoneNumberFromString } from "libphonenumber-js";

// import logoCerradoWhite from "../../assets/Logo_Mitsumichi_White.png";
// import logoCerradoBlack from "../../assets/Logo_Mitsumichi.png";

// const Invoice_PDF = ({ user, facturaData, subtotal }) => {
//   const styles = StyleSheet.create({
//     page: {
//       flexDirection: "column",
//       backgroundColor: "#fff",
//       padding: 20,
//       fontSize: 12,
//     },
//     section: {
//       flexDirection: "column",
//       marginBottom: 20,
//     },
//     logoContainer: {
//       width: 200,
//       marginRight: 20,
//     },
//     logo: {
//       width: "100%",
//       height: "auto",
//     },
//     header: {
//       fontSize: 20,
//       fontWeight: "bold",
//       marginBottom: 10,
//     },
//     subHeader: {
//       fontSize: 12,
//       marginBottom: 10,
//     },
//     content: {
//       flex: 1,
//     },
//     table: {
//       display: "table",
//       width: "auto",
//       borderStyle: "solid",
//       borderWidth: 1,
//       borderRightWidth: 0,
//       borderBottomWidth: 0,
//     },
//     tableRow: {
//       flexDirection: "row",
//     },
//     tableCell: {
//       margin: "auto",
//       marginVertical: 5,
//       borderBottomColor: "#000",
//       borderBottomWidth: 1,
//       textAlign: "center",
//     },
//     totalRow: {
//       flexDirection: "row",
//     },
//     totalCell: {
//       marginVertical: 5,
//       borderBottomColor: "#000",
//       borderBottomWidth: 1,
//       textAlign: "center",
//       fontWeight: "bold",
//     },
//     footer: {
//       marginTop: 20,
//       fontSize: 10,
//       textAlign: "center",
//     },
//   });

//   const elementosComprados = Object.values(facturaData).filter(
//     (item) => item.brand && item.cantidad && item.precio && item.motoModel
//   );

//   const phoneNumber = parsePhoneNumberFromString(user?.data?.telefono);

//   return (
//     <Document>
//       <Page size="A4" style={styles.page}>
//         <View style={styles.section}>
//           <View style={styles.logoContainer}>
//             <Image src={logoCerradoWhite} style={styles.logo} />
//           </View>
//           <View style={styles.content}>
//             <Text style={styles.header}>MITSUMICHI</Text>
//             <Text style={styles.subHeader}>© 2023 MITSUMISHI S.A.</Text>
//             <Text>No. Factura: MIT{facturaData?.id}</Text>
//             <Text>
//               Cliente: {user?.data?.name} {user?.data?.apellido}
//             </Text>
//             <Text>Dirección: {user?.data?.direccion}</Text>
//             <Text>Tel: {phoneNumber.formatInternational()}</Text>
//             <Text>Email: {user?.email}</Text>
//           </View>
//         </View>

//         <View style={styles.section}>
//           <View style={styles.table}>
//             <View style={styles.tableRow}>
//               <View style={styles.tableCell}>Id Producto</View>
//               <View style={styles.tableCell}>Descripción del Producto</View>
//               <View style={styles.tableCell}>Categoria</View>
//               <View style={styles.tableCell}>Cantidad</View>
//               <View style={styles.tableCell}>Precio Und</View>
//               <View style={styles.tableCell}>Total</View>
//             </View>

//             {elementosComprados.map((producto, index) => (
//               <View style={styles.tableRow} key={index}>
//                 <View style={styles.tableCell}>
//                   <Text>MIT</Text>
//                   {producto?.id}
//                 </View>
//                 <View style={styles.tableCell}>
//                   {producto?.brand} - {producto?.motoModel}
//                 </View>
//                 <View style={styles.tableCell}>{producto?.tipo}</View>
//                 <View style={styles.tableCell}>
//                   {producto?.cantidad} {producto?.cantidad > 1 ? "Unds" : "Und"}
//                 </View>
//                 <View style={styles.tableCell}>
//                   $
//                   {parseFloat(producto?.precio).toLocaleString("en-US", {
//                     currency: "USD",
//                     minimumFractionDigits: 2,
//                   })}
//                 </View>
//                 <View style={styles.tableCell}>
//                   $
//                   {parseFloat(
//                     producto?.precio * producto?.cantidad
//                   ).toLocaleString("en-US", {
//                     currency: "USD",
//                     minimumFractionDigits: 2,
//                   })}
//                 </View>
//               </View>
//             ))}
//           </View>
//         </View>

//         <View style={styles.section}>
//           <View style={styles.totalRow}>
//             <Text style={[styles.totalCell, { flex: 5 }]}>Sub Total:</Text>
//             <Text style={[styles.totalCell, { flex: 1 }]}>
//               $
//               {parseFloat(subtotal).toLocaleString("en-US", {
//                 currency: "USD",
//                 minimumFractionDigits: 2,
//               })}
//             </Text>
//           </View>
//           <View style={styles.totalRow}>
//             <Text style={[styles.totalCell, { flex: 5 }]}>Descuento:</Text>
//             <Text style={[styles.totalCell, { flex: 1 }]}>$0.00</Text>
//           </View>
//           <View style={styles.totalRow}>
//             <Text style={[styles.totalCell, { flex: 5, fontSize: 16 }]}>
//               Total:
//             </Text>
//             <Text style={[styles.totalCell, { flex: 1, fontSize: 16 }]}>
//               $
//               {parseFloat(subtotal).toLocaleString("en-US", {
//                 currency: "USD",
//                 minimumFractionDigits: 2,
//               })}
//             </Text>
//           </View>
//         </View>

//         <View style={styles.section}>
//           <Text style={styles.footer}>
//             Eres parte esencial de lo que hacemos en{" "}
//             <Text style={styles.header}>MITSUMICHI</Text>; por eso, nos
//             mantenemos pendientes de lo que necesitas y actuamos para brindarte
//             soluciones relevantes.
//           </Text>
//           <Text style={styles.footer}>
//             GRACIAS POR HACER NEGOCIOS CON NOSOTROS!!!
//           </Text>
//         </View>
//       </Page>
//     </Document>
//   );
// };

// export default Invoice_PDF;
