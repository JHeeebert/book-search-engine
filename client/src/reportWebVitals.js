const reportWebVitals = onPerfEntry => {
    if (onPerfEntry && onPerfEntry instanceof Function) {
        import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
            getCLS(onPerfEntry);
            getFID(onPerfEntry);
            getFCP(onPerfEntry);
            getLCP(onPerfEntry);
            getTTFB(onPerfEntry);
        });
    }
    else {
        import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
            getCLS();
            getFID();
            getFCP();
            getLCP();
            getTTFB();
        });
    }
    return () => { };
    // or you can return a function to stop sending the data
    // return () => window.performance.mark('web-vitals');
};

// If you want to start measuring performance in your app, pass a function
 // to log results (for example: reportWebVitals(console.log))
 // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();